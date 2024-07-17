import type { NextApiRequest, NextApiResponse } from 'next';
import { searchBrave } from '../../lib/brave';
import { rewriteQuery } from '../../lib/queryRewriter';
import { rerankSnippets } from '../../lib/cohere';

interface Snippet {
  text: string;
  url: string;
}

interface Website {
  mainSnippet: string;
  snippets: Snippet[];
  source: string;
}

interface BraveResults {
  websites: Website[];
}

interface RerankResult {
  document: string;
}

// Function to generate a summary using OpenAI
async function generateSummary(query: string, snippets: string[]): Promise<string> {
  const prompt = `Summarize the following snippets into a concise answer for the query: "${query}"\n\n${snippets.join('\n\n')}`;

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`Error generating summary: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].text.trim();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request received:', req.body); // Log the request body for debugging
  const { query } = req.body;

  try {
    const rewrittenQuery = await rewriteQuery(query);

    console.log('Searching Brave...');
    const braveResults: BraveResults = await searchBrave(rewrittenQuery);

    console.log('Extracting snippets...');
    const snippets = braveResults.websites.flatMap((site: Website) => site.snippets.map(snippet => ({
      text: snippet.text,
      url: site.source
    })));

    console.log('Reranking snippets...');
    const rerankedSnippets: RerankResult[] = await rerankSnippets(snippets.map(snippet => snippet.text), query);

    console.log('Formatting result...');
    const result = rerankedSnippets.map((rerank: RerankResult) => {
      const site = braveResults.websites.find((site: Website) => site.snippets.some(snippet => snippet.text === rerank.document));
      const snippet = site ? site.snippets.find(snippet => snippet.text === rerank.document) : { text: '', url: '' };
      return {
        mainSnippet: site ? site.mainSnippet : '',
        extraSnippets: rerank.document,
        source: site ? site.source : '',
        url: snippet ? snippet.url : ''
      };
    });

    // Select top 3 snippets for summary
    const topThreeSnippets = rerankedSnippets.slice(0, 3).map(rerank => rerank.document);

    console.log('Generating summary...');
    const summary = await generateSummary(query, topThreeSnippets);

    console.log('Result:', result);
    res.status(200).json({ summary, snippets: result });
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
