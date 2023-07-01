import { type NextApiRequest, type NextApiResponse } from 'next';
import ytdl from 'ytdl-core';
import Joi from 'joi';
import { CANNOT_GET_VIDEO_INFO } from '~/constants/text';

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
    console.log(req.body);
    await bodySchema.validateAsync(req.body);
  } catch (error: any) {
    const { message } = error as { message: string };
    res.status(400).json({ message });
    return;
  }

  const { youtubeVideoId } = req.body as { youtubeVideoId: string };

  try {
    const info = await ytdl.getBasicInfo(youtubeVideoId);

    const title = info.videoDetails.title;
    const description = info.videoDetails.description;
    const author = info.videoDetails.author.name;

    res.status(200).json({
      title,
      description,
      author,
    });
  } catch (err) {
    res.status(500).json({
      message: CANNOT_GET_VIDEO_INFO,
    });
  }
}
