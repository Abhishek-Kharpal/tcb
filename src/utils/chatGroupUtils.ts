import { type ChatGroup } from '~/types';
import { getFromStorage, setInStorage } from './storageUtils';

export const getAllChatGroups = (): ChatGroup[] => {
  const allChatGroupsString = getFromStorage(`chatGroups`);
  const allChatGroups = allChatGroupsString
    ? (JSON.parse(allChatGroupsString) as ChatGroup[])
    : [];

  return allChatGroups;
};

export function setAllChatGroups(chatGroups: ChatGroup[]): void {
  setInStorage(`chatGroups`, JSON.stringify(chatGroups));
}
