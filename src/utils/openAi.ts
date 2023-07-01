import { Configuration, OpenAIApi } from 'openai';
import { SayVidError } from '~/errors';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function getCompletion(prompt: string): Promise<string> {
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
    });

    return (
      completion.data.choices[0]?.text ??
      'sorry, Could not do it, can you try again later ?'
    );
  } catch (error: any) {
    console.error(error);
    if (error?.response) {
      throw new SayVidError(error.response?.data?.error?.message);
    }
  }
}
