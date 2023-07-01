import { useEffect, useState } from 'react';
import { Chat } from '../../types';
interface ChatModalProps {
  chatGroupId: string;
}

const ChatModal = ({ chatGroupId }: ChatModalProps) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    // Call API to fetch chats of specific chat group
    setChats([
      {
        chatId: '1',
        chatGroupId: '1',
        data: 'Message 1',
        isMe: true,
      },
      {
        chatId: '2',
        chatGroupId: '1',
        data: 'Message 2',
        isMe: true,
      },
    ]);
  }, []);

  return <></>;
};

export default ChatModal;
