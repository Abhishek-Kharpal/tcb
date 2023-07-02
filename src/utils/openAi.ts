import { Configuration, OpenAIApi } from 'openai';
import { SayVidError } from '~/errors';
import { getFromStorage } from './storageUtils';

interface APIErrorResponse {
  response: {
    data: {
      error: {
        message: string;
      };
    };
  };
}

let openai: OpenAIApi | null = null;
const getOpenAiInstance = () => {
  if (!openai) {
    const configuration = new Configuration({
      apiKey: getFromStorage('openAI_API_Key') ?? '',
    });
    openai = new OpenAIApi(configuration);
  }
  return openai;
};

export default async function getCompletion(prompt: string): Promise<string> {
  try {
    const openai = getOpenAiInstance();
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    return (
      completion.data.choices[0]?.message?.content ??
      'sorry, Could not do it, can you try again later ?'
    );
  } catch (error: any) {
    console.error(error);
    const errorResponse = (error as APIErrorResponse).response;
    if (errorResponse) {
      throw new SayVidError(errorResponse?.data?.error?.message);
    }
    throw error;
  }
}
