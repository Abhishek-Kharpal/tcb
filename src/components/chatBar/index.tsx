import { Box } from '@mui/material';
import { Chat } from '../../types';

interface ChatBarProps {
  chat: Chat;
}

const ChatBar = ({ chat }: ChatBarProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: chat.isMe ? 'flex-end' : 'flex-start',
        width: '100%',
      }}
    >
      <Box
        sx={{
          bgcolor: chat.isMe ? 'secondary.light' : 'primary.main',
          color: chat.isMe ? 'secondary.contrastText' : 'primary.contrastText',
          borderRadius: '8px 8px 0px 8px',
          padding: '8px',
          marginTop: '8px',
          maxWidth: '50%',
          flexGrow: 1,
        }}
      >
        {chat.data}
      </Box>
    </Box>
  );
};

export default ChatBar;
