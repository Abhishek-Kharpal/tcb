import { useEffect, useState, useContext, useRef } from 'react';
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  LinearProgress,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChatBar from '../chatBar';
import { type Chat } from '../../types';
import {
  createInitialChatMessage,
  getAllChats,
  getChatResponse,
  setAllChats as saveAllChats,
} from '~/utils/chatUtils';
import { ErrorContext } from '~/contexts/errorContext';
import { getFromStorage, setInStorage } from '~/utils/storageUtils';

interface ChatModalProps {
  chatGroupId: string;
  title: string;
  youtubeVideoUrl: string;
}

const ChatModal = ({ chatGroupId, title, youtubeVideoUrl }: ChatModalProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loadChat, setLoadChat] = useState<boolean>(false);

  const chatsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(chatsContainerRef);
    if (chatsContainerRef?.current) {
      chatsContainerRef.current.scrollTop =
        chatsContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const { setError } = useContext(ErrorContext);

  const sendChatHandler = async (chatInputValue: string) => {
    if (chatInputValue.trim() === '') return;
    setChats((prevChats) => {
      const newChats = [
        ...prevChats,
        {
          chatId: String(prevChats.length + 1),
          chatGroupId: '1',
          data: chatInputValue,
          isMe: true,
        },
      ];
      saveAllChats(chatGroupId, newChats);
      return newChats;
    });

    setLoadChat(true);

    const response = await getChatResponse(
      chatInputValue,
      chatGroupId,
      setError,
    );

    setLoadChat(false);

    if (!response) {
      return;
    }

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
    if (
      chats.length === 0 &&
      getFromStorage(`${chatGroupId}_initial_message_created`) !== 'true'
    ) {
      setInStorage(`${chatGroupId}_initial_message_created`, 'true');
      createInitialChatMessage(youtubeVideoUrl, setError)
        .then(sendChatHandler)
        .catch(console.error);
    }
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
        ref={chatsContainerRef}
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
        {loadChat && (
          <LinearProgress
            sx={{
              bgcolor: '#20232b',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#b785f5',
              },
              position: 'relative',
              bottom: '-20px',
              margin: '0 20px',
            }}
          />
        )}

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
