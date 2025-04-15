import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00008B',
    },
    secondary: {
      main: '#708090',
    },
    background: {
      default: '#f4f4f4',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    button: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
