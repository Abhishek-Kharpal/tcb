import { useEffect, useState } from 'react';
import { Box, Typography, InputBase, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChatBar from '../chatBar';
import { type Chat } from '../../types';

interface ChatModalProps {
  chatGroupId: string;
  title: string;
}

const ChatModal = ({ chatGroupId, title }: ChatModalProps) => {
  const [chats, setChats] = useState<Chat[]>([]);

  const sendChatHandler = (chatInputValue: string) => {
    // TODO: send chat, get response, and update chats
    setChats((prevChats) => [
      ...prevChats,
      {
        chatId: String(prevChats.length + 1),
        chatGroupId: '1',
        data: chatInputValue,
        isMe: true,
      },
    ]);
  };

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
        isMe: false,
      },
      {
        chatId: '3',
        chatGroupId: '1',
        data: 'Message 3',
        isMe: true,
      },
    ]);
  }, []);

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
          sendChatHandler(chatInput.value);
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
