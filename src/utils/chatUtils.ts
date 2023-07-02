import { INITIAL_PROMPT_WITH_FOLLOWING_TRANSCRIPT } from '~/constants/text';
import { getFromStorage, setInStorage } from './storageUtils';
import { getTranscriptOfYoutubeVideo } from './youtubeUtils';
import { type Chat } from '~/types';
import getCompletion from './openAi';
import { SayVidError } from '~/errors';

export async function createInitialChatMessage(
  youtubeVideoURI: string,
  errorHandler: (errorMessage: string) => any,
): Promise<string> {
  try {
    return `${INITIAL_PROMPT_WITH_FOLLOWING_TRANSCRIPT}\n\n${await getTranscriptOfYoutubeVideo(
      youtubeVideoURI,
    )}`;
  } catch (error) {
    errorHandler(
      error instanceof SayVidError
        ? error.message
        : 'Something went wrong. Please try again later.',
    );
    return '';
  }
}

export const getMessageAfter5Seconds = (message: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(message);
    }, 5000);
  });
};

export const getChatResponse = async (
  message: string,
  chatGroupId: string,
  errorHandler: (errorMessage: string) => any,
): Promise<string | null> => {
  return await getMessageAfter5Seconds('yo');
  // try {
  //   return await getCompletion(message);
  // } catch (error) {
  //   errorHandler(
  //     error instanceof SayVidError
  //       ? error.message
  //       : 'Something went wrong. Please try again later.',
  //   );
  //   return null;
  // }
};

export const getAllChats = (chatGroupId: string): Chat[] => {
  const allChatsString = getFromStorage(`${chatGroupId}_chats`);
  const allChats = allChatsString ? (JSON.parse(allChatsString) as Chat[]) : [];
  return allChats;
};

export function setAllChats(chatGroupId: string, chats: Chat[]): void {
  setInStorage(`${chatGroupId}_chats`, JSON.stringify(chats));
}
