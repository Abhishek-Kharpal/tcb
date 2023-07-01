import {createTheme} from '@mui/material/styles';
import '@fontsource/poppins/400.css';


const theme = createTheme({
  palette: {
    primary: {
      main: '#20232b',
      light: '#f3fc8a',
      contrastText: '#767981',
    },
    secondary: {
      main: '#16171b',
      light: '#b785f5',
      contrastText: '#FFFFFF',
    },
  },
});

export default theme;