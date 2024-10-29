// lib/cohere.ts

import axios from 'axios';

const COHERE_API_KEY = process.env.COHERE_API_KEY;

if (!COHERE_API_KEY) {
  throw new Error('COHERE_API_KEY environment variable is not set');
}

export async function rerankSnippets(snippets: string[], query: string) {
  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/rerank',
      {
        query: query,
        documents: snippets,
        top_n: 3,
        model: 'rerank-english-v2.0'
      },
      {
        headers: {
          'Authorization': `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    return {
      results: response.data.results.map((result: any) => ({
        index: result.index,
        relevance_score: result.relevance_score
      }))
    };
  } catch (error) {
    console.error('Error in rerankSnippets:', error);
    return {
      results: snippets.map((_, index) => ({
        index,
        relevance_score: 0
      }))
    };
  }
}