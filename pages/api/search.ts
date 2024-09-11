// import type { NextApiRequest, NextApiResponse } from 'next';
// import { searchBrave } from '../../lib/brave';
// import { rewriteQuery } from '../../lib/queryRewriter';

// interface SearchResult {
//   title: string;
//   url: string;
//   snippet: string;
// }

// interface BraveResults {
//   web?: {
//     results: SearchResult[];
//   };
//   mixed?: {
//     main: SearchResult[];
//     top: SearchResult[];
//     side: SearchResult[];
//   };
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log('Request received:', req.body); // Log the request body for debugging
//   const { query } = req.body;

//   try {
//     const rewrittenQuery = await rewriteQuery(query);

//     console.log('Searching Brave...');
//     const braveResults: BraveResults = await searchBrave(rewrittenQuery);

//     // console.log('Brave search result:', JSON.stringify(braveResults, null, 2));

//     // Extract web or mixed search results
//     console.log("Query passed to Brave API:", rewrittenQuery);
//     const results = braveResults.web?.results || braveResults.mixed?.main || [];

//     if (results.length === 0) {
//       console.warn('No search results found.');
//       return res.status(200).json({ results: [] });
//     }

//     // Return the search results
//     res.status(200).json({ results });

//   } catch (error) {
//     console.error('Error in handler:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
import type { NextApiRequest, NextApiResponse } from 'next';
import { searchBrave } from '../../lib/brave';
import { rewriteQuery } from '../../lib/queryRewriter';

interface SearchResult {
  // title: string;
  // url: string;
  // snippet: string;
}

interface BraveResults {
  web?: {
    results: SearchResult[];
  };
  mixed?: {
    main: SearchResult[];
    top: SearchResult[];
    side: SearchResult[];
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request received:', req.body); // Log the request body for debugging
  const { query } = req.body;

  try {
    const rewrittenQuery = await rewriteQuery(query);

    console.log('Searching Brave...');
    const braveResults: BraveResults = await searchBrave(rewrittenQuery);

    console.log("Query passed to Brave API:", rewrittenQuery);

    // Extract the results from the Brave API response
    const results = braveResults.web?.results || braveResults.mixed?.main || [];

    if (results.length === 0) {
      console.warn('No search results found.');
      return res.status(200).json({ snippets: [], results: [] });
    }

    // Map snippets to their corresponding links
    // const snippets = results.map(result => ({
    //   snippet: result.snippet,
    //   url: result.url,
    // }));

    // Return the mapping of snippets to links and the full results
    res.status(200).json({ results });

  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
