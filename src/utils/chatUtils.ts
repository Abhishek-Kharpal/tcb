import { INITIAL_PROMPT_WITH_FOLLOWING_TRANSCRIPT } from '~/constants/text';
import { getFromStorage, setInStorage } from './storageUtils';
import { getTranscriptOfYoutubeVideo } from './youtubeUtils';
import { type Chat } from '~/types';

export async function createInitialChatMessage(
  youtubeVideoURI: string,
): Promise<string> {
  return `${INITIAL_PROMPT_WITH_FOLLOWING_TRANSCRIPT}

${await getTranscriptOfYoutubeVideo(youtubeVideoURI)}`;
}

export const getChatResponse = async (
  message: string,
  chatGroupId: string,
  errorHandler: (errorMessage: string) => any,
): Promise<string> => {
  return 'yo';
};

export const getAllChats = (chatGroupId: string): Chat[] => {
  const allChatsString = getFromStorage(`${chatGroupId}_chats`);
  const allChats = allChatsString ? (JSON.parse(allChatsString) as Chat[]) : [];
  return allChats;
};

export function setAllChats(chatGroupId: string, chats: Chat[]): void {
  setInStorage(`${chatGroupId}_chats`, JSON.stringify(chats));
}
