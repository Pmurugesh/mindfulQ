import axios from 'axios';
const BRAVE_API_KEY = process.env.BRAVE_API_KEY;


const SUMMARIZER_API_URL = 'https://api.search.brave.com/res/v1/summarizer/search'; // Replace with the actual Summarizer API URL

export async function fetchSummary(key: string): Promise<string> {
  try {
    const response = await axios.post(
      SUMMARIZER_API_URL,
      {
        key: key,
      },
      {
        headers: {
          'X-Subscription-Token':  BRAVE_API_KEY,
          'Accept': 'application/json',
          // Add other headers as needed
        },
        params: {
          entity_info: true, // Optional: set to true if you want extra entities info
        },
      }
    );

    if (response && response.data.results && response.data.results.length > 0) {
      // Extract the first result's answer field
      return response.data.results[0].answer || '';
    } else {
      console.warn('No summary results found in the Summarizer API response.');
      return '';
    }
  } catch (error) {
    console.error('Error fetching summary from Summarizer API:', error);
    throw new Error('Failed to fetch summary');
  }
}
