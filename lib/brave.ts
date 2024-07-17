// lib/brave.ts

import axios from 'axios';

const BRAVE_API_KEY = process.env.BRAVE_API_KEY;

export const searchBrave = async (query: string) => {
  const response = await axios.get(`https://api.search.brave.com/api/v1/search`, {
    params: { q: query },
    headers: { Authorization: `Bearer ${BRAVE_API_KEY}` },
  });
  return response.data;
};
