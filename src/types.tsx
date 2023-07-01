export interface Chat {
  chatId: string;
  data: string;
  isMe: boolean;
  chatGroupId: string;
}

export interface ChatGroup {
  chatGroupId: string;
  title: string;
  youtubeVideoUrl: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface VideoInfo {
  title: string;
  description: string;
  author: string;
}
