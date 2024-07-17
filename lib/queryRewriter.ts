import axios from 'axios';

const LLM_API_KEY = process.env.LLM_API_KEY;

if (!LLM_API_KEY) {
  throw new Error('LLM_API_KEY environment variable is not set');
}

export const rewriteQuery = async (query: string): Promise<string> => {
  const currentDate = new Date().toISOString();
  const first60Chars = query.substring(0, 60);
  const prompt = `You are tasked to turn searches into natural language queries, and the associated google query. Be as clever as possible to transform the search, and retrieve a list of relevant results. Current date is ${currentDate}. Your first task is to transform this search query: \`\`\`${first60Chars}\`\`\``;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo', // Update to a currently supported model
        prompt: prompt,
        max_tokens: 50,
      },
      {
        headers: { Authorization: `Bearer ${LLM_API_KEY}` },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      console.error('Error in rewriteQuery:', error.response ? error.response.data : error.message);
    } else {
      // Unknown error
      console.error('Unexpected error in rewriteQuery:', error);
    }
    throw new Error('Failed to rewrite query');
  }
};
