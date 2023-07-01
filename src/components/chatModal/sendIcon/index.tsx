import { IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SendIcon = () => {
  return (
    <IconButton>
      <ArrowForwardIcon
        sx={{
          color: 'secondary.contrastText',
        }}
      />
    </IconButton>
  );
};

export default SendIcon;
