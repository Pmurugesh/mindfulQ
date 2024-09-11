import axios from 'axios';

const BRAVE_API_KEY = process.env.BRAVE_API_KEY;

if (!BRAVE_API_KEY) {
  throw new Error('BRAVE_API_KEY environment variable is not set');
}

export const searchBrave = async (query: string) => {
  if (!query || query.length === 0) {
    throw new Error('Query cannot be empty');
  }
  if (query.length > 400) {
    throw new Error('Query exceeds the maximum length of 400 characters');
  }

  try {
    const response = await axios.get('https://api.search.brave.com/res/v1/web/search', {
      params: {
        q: query,
        text_decorations: 1,       // Enable text decorations in snippets
        extra_snippets: true,      // Request additional snippets
        // summary: true,             // Enable summary in the response
        // search_lang: 'en',         // Optional: set search language
        // ui_lang: 'en-US',          // Optional: set UI language
        count: 10,                 // Optional: number of results to return
        safesearch: 'moderate',    // Optional: control safe search settings
      },
      headers: { 
        'X-Subscription-Token': BRAVE_API_KEY,  // Use X-Subscription-Token instead of Authorization
        'Accept': 'application/json'  // Ensure the correct Accept header is set
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error in searchBrave:', error.response ? error.response.data : error.message);
    } else if (error instanceof Error) {
      console.error('Unexpected error in searchBrave:', error.message);
    } else {
      console.error('An unknown error occurred in searchBrave');
    }
    throw new Error('Failed to fetch search results');
  }
};
