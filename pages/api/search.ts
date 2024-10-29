import type { NextApiRequest, NextApiResponse } from 'next';
import { searchBrave } from '../../lib/brave';
import { rewriteQuery } from '../../lib/queryRewriter';
import { rerankSnippets } from '../../lib/cohere';
import { BraveSearchResult, SearchResult } from '../../types/search';

interface BraveResults {
  web?: {
    results: BraveSearchResult[];
  };
  mixed?: {
    main: BraveSearchResult[];
    top: BraveSearchResult[];
    side: BraveSearchResult[];
  };
}

interface RankResult {
  index: number;
  relevance_score: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request received:', req.body);
  const { query } = req.body;

  try {
    const rewrittenQuery = await rewriteQuery(query);
    console.log('Searching Brave...');
    const braveResults: BraveResults = await searchBrave(rewrittenQuery);
    console.log("Query passed to Brave API:", rewrittenQuery);

    const results = braveResults.web?.results || [];

    if (results.length === 0) {
      console.warn('No search results found.');
      return res.status(200).json({ results: [] });
    }

    const processedResults = await Promise.all(results.map(async (result) => {
      try {
        const allSnippets = [result.description, ...(result.extra_snippets || [])];
        const rankedSnippets = await rerankSnippets(allSnippets, query);

        return {
          title: result.title,
          url: result.url,
          snippet: result.description,
          rankedSnippets: rankedSnippets.results.map((rankResult: RankResult) => ({
            text: allSnippets[rankResult.index],
            relevance_score: rankResult.relevance_score
          }))
        };
      } catch (error) {
        console.error('Error processing result:', error);
        return {
          title: result.title,
          url: result.url,
          snippet: result.description,
          rankedSnippets: []
        };
      }
    }));

    res.status(200).json({ results: processedResults });

  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
