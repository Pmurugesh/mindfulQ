import axios from 'axios';

const LLM_API_KEY = process.env.LLM_API_KEY;

if (!LLM_API_KEY) {
  throw new Error('LLM_API_KEY environment variable is not set');
}

export const rewriteQuery = async (query: string): Promise<string> => {
  const currentDate = new Date().toISOString();
  const first60Chars = query.substring(0, 60);
  const prompt = `Extract and return only the transformed natural language query. Do not include any explanations or additional text. Transform this search query: \`\`\`${first60Chars}\`\`\`
  `

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions', // Correct endpoint for chat models
      {
        model: 'gpt-3.5-turbo', // Chat model requires this format
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 50,
      },
      {
        headers: { Authorization: `Bearer ${LLM_API_KEY}` },
      }
    );

    // The response format for chat models differs
    return response.data.choices[0].message.content.trim();
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
