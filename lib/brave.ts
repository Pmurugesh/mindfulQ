import axios from 'axios';

const BRAVE_API_KEY = process.env.BRAVE_API_KEY;

if (!BRAVE_API_KEY) {
  throw new Error('BRAVE_API_KEY environment variable is not set');
}

export const searchBrave = async (query: string) => {
  if (!query || query.length === 0) {
    throw new Error('Query cannot be empty');
  }

  try {
    const response = await axios.get('https://api.search.brave.com/res/v1/web/search', {
      params: {
        q: query,
        text_decorations: true,
        extra_snippets: true,
        count: 10
      },
      headers: { 
        'X-Subscription-Token': BRAVE_API_KEY,
        'Accept': 'application/json'
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error in searchBrave:', error);
    throw new Error('Failed to fetch search results');
  }
};
