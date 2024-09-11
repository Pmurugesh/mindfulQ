// lib/cohere.ts

import axios from 'axios';

const COHERE_API_KEY = process.env.COHERE_API_KEY;

export const rerankSnippets = async (snippets: string[], query: string) => {
  const response = await axios.post('https://api.cohere.com/rank', {
    query: query,
    documents: snippets,
  }, {
    headers: { Authorization: `Bearer ${COHERE_API_KEY}` },
  });
  return response.data;
};
