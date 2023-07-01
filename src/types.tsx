export interface Chat {
  chatId: string;
  name: string;
  lastMessage?: string;
  lastMessageTime?: string;
  isMe: boolean;
  chatGroupId: string;
}

export interface ChatGroup {
  chatGroupId: string;
  title: string;
}
