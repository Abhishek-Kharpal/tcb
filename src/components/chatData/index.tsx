import { Box, Typography } from '@mui/material';
import { Chat } from '../../types';

interface ChatDataProps {
  chat: Chat;
  selected: boolean;
  onClick: () => void;
}

const ChatData = ({ chat, selected, onClick }: ChatDataProps) => {
  return (
    <Box
      sx={{
        height: '72px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: selected ? 'secondary.main' : 'primary.main',
        cursor: 'pointer',
        borderRadius: '8px',
      }}
      className="basic-padding"
      onClick={onClick}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            color: 'primary.contrastText',
            fontWeight: 'bold',
          }}
        >
          <Typography variant="subtitle1">{chat.name}</Typography>
        </Box>
        <Box
          sx={{
            color: 'primary.contrastText',
          }}
        >
          <Typography variant="caption">{chat.lastMessage}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          color: 'primary.contrastText',
        }}
      >
        <Typography variant="caption">{chat.lastMessageTime}</Typography>
      </Box>
    </Box>
  );
};

export default ChatData;
