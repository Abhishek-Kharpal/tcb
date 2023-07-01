export interface Chat {
  chatId: string;
  data: string;
  isMe: boolean;
  chatGroupId: string;
}

export interface ChatGroup {
  chatGroupId: string;
  title: string;
  lastMessage?: string;
  lastMessageTime?: string;
}
