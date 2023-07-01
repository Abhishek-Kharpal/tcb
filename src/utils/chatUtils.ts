import { INITIAL_PROMPT_WITH_FOLLOWING_TRANSCRIPT } from '~/constants/text';
import { getFromStorage, setInStorage } from './storageUtils';
import { getTranscriptOfYoutubeVideo } from './youtubeUtils';

export async function createInitialChatMessage(
  youtubeVideoURI: string,
): Promise<string> {
  return `${INITIAL_PROMPT_WITH_FOLLOWING_TRANSCRIPT}

${await getTranscriptOfYoutubeVideo(youtubeVideoURI)}`;
}

// export const getChatResponse = async (
//   message: string, errorHandler: (errorMessage: string) => any) => {
//   const chatResponseData =
//     await makeRequest(POST_CHAT({ message }), errorHandler);
//   return chatResponseData?.message;
// };

// export const getAllChats = async (): Promise<Chat[]> => {
//   const idCurrentPage = await getIdOfCurrentPage();
//   const allChatsString = await getFromStorage(`${idCurrentPage}_chats`);
//   const allChats = allChatsString ?
//     (JSON.parse(allChatsString) as Chat[]) : null;

//   return allChats ?? [
//     {
//       text: InitialChatText,
//       isMe: false
//     }
//   ];
// };

// export async function setAllChats(chats: Chat[]) {
//   const idCurrentPage = await getIdOfCurrentPage();
//   await setInStorage(`${idCurrentPage}_chats`, JSON.stringify(chats));
// }
