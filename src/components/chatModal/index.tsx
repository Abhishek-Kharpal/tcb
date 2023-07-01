import { useEffect, useState } from 'react';
import { Box, Typography, InputBase, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChatBar from '../chatBar';
import { type Chat } from '../../types';
import {
  createInitialChatMessage,
  getAllChats,
  getChatResponse,
  setAllChats as saveAllChats,
} from '~/utils/chatUtils';

interface ChatModalProps {
  chatGroupId: string;
  title: string;
  youtubeVideoUrl: string;
}

const ChatModal = ({ chatGroupId, title, youtubeVideoUrl }: ChatModalProps) => {
  const [chats, setChats] = useState<Chat[]>([]);

  const sendChatHandler = async (chatInputValue: string) => {
    setChats((prevChats) => {
      const newChats = [
        ...prevChats,
        {
          chatId: String(prevChats.length + 1),
          chatGroupId: '1',
          data: response,
          isMe: false,
        },
      ];
      saveAllChats(chatGroupId, newChats);
      return newChats;
    });

    const response = await getChatResponse(
      chatInputValue,
      chatGroupId,
      console.error,
    );

    setChats((prevChats) => {
      const newChats = [
        ...prevChats,
        {
          chatId: String(prevChats.length + 1),
          chatGroupId: '1',
          data: response,
          isMe: false,
        },
      ];
      saveAllChats(chatGroupId, newChats);
      return newChats;
    });
  };

  useEffect(() => {
    const chats = getAllChats(chatGroupId);
    setChats(chats);
    return () => {
      if (chats.length === 0) {
        createInitialChatMessage(youtubeVideoUrl)
          .then(sendChatHandler)
          .catch(console.error);
      }
    };
  }, [chatGroupId]);

  return (
    // Module to send chats and display previous chats
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 1,
      }}
    >
      {/* Space for header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'secondary.main',
          color: 'secondary.contrastText',
          borderRadius: '16px 16px 0px 0px',
          width: '100%',
        }}
        className="basic-padding"
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: '1.25rem',
          }}
        >
          {title}
        </Typography>
      </Box>
      {/* Space for chats */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '0 16px',
        }}
      >
        {chats.map((chat) => (
          <ChatBar key={chat.chatId} chat={chat} />
        ))}
      </Box>
      {/* Space for input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formElement = e.currentTarget as HTMLFormElement;
          const chatInput = formElement.chatInput as HTMLInputElement;
          void sendChatHandler(chatInput.value);
          chatInput.value = '';
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
          className="basic-padding"
        >
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            className="basic-padding"
          >
            <InputBase
              sx={{
                flexGrow: 1,
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText',
              }}
              placeholder="Type a message"
              name="chatInput"
            />
            <IconButton
              sx={{
                color: 'secondary.contrastText',
              }}
              type="submit"
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ChatModal;
