import { type NextApiRequest, type NextApiResponse } from 'next';
import { YoutubeTranscript } from 'youtube-transcript';
import Joi from 'joi';

const ALLOWED_METHODS = ['POST', 'OPTIONS'];

const bodySchema = Joi.object({
  youtubeVideoId: Joi.string().required(),
});

export default async function getYoutubeTranscripts(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (![...ALLOWED_METHODS, undefined].includes(req.method)) {
    res.setHeader('Allow', ALLOWED_METHODS);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    await bodySchema.validateAsync(req.body);
  } catch (error: any) {
    const { message } = error as { message: string };
    res.status(400).json({ message });
    return;
  }

  const { youtubeVideoId } = req.body as { youtubeVideoId: string };

  try {
    const transcriptJson = await YoutubeTranscript.fetchTranscript(
      youtubeVideoId,
    );
    const transcript = transcriptJson.map((item) => item.text).join(' ');
    res.status(200).json({ transcript });
  } catch (err) {
    res.status(200).json({
      transcript: null,
    });
  }
}
