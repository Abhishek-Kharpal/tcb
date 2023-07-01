import {
  NOT_A_YOUTUBE_VIDEO_ERROR_MESSAGE,
  TRANSCRIPT_FAIL_ERROR_MESSAGE,
  TRANSCRIPT_NOT_FOUND_ERROR_MESSAGE,
} from '~/constants/text';
import { SayVidError } from '~/errors';

export function isAYoutubeVideoUrl(youtubeVideoURI: string) {
  return youtubeVideoURI.startsWith('https://www.youtube.com/watch?v=');
}

export function getYoutubeVideoId(youtubeVideoURI: string) {
  if (!isAYoutubeVideoUrl(youtubeVideoURI)) {
    throw new SayVidError(NOT_A_YOUTUBE_VIDEO_ERROR_MESSAGE);
  }
  const youtubeVideoId = youtubeVideoURI.match(
    /(?:v=|\/)([0-9A-Za-z_-]{11}).*/,
  )?.[1];
  if (!youtubeVideoId) {
    throw new SayVidError(NOT_A_YOUTUBE_VIDEO_ERROR_MESSAGE);
  } else {
    return youtubeVideoId;
  }
}

export async function getTranscriptOfYoutubeVideo(
  youtubeVideoURI: string,
): Promise<string> {
  try {
    const response = await fetch('/api/transcript', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        youtubeVideoId: getYoutubeVideoId(youtubeVideoURI),
      }),
    });
    const { transcript } = (await response.json()) as {
      transcript: string | null;
    };

    if (transcript === null) {
      throw new SayVidError(TRANSCRIPT_NOT_FOUND_ERROR_MESSAGE);
    }
    return transcript;
  } catch (err) {
    if (err instanceof SayVidError) throw err;
    throw new SayVidError(TRANSCRIPT_FAIL_ERROR_MESSAGE);
  }
}
