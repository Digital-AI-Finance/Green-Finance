import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#3333B2' },      // mlpurple
    secondary: { main: '#ADADE0' },    // mllavender
    success: { main: '#2CA02C' },      // mlgreen
    warning: { main: '#FF7F0E' },      // mlorange
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: { fontWeight: 700, color: '#3333B2' },
    h2: { fontWeight: 600, color: '#3333B2' },
    h3: { fontWeight: 600, color: '#3333B2' },
    h4: { fontWeight: 500, color: '#3333B2' },
  }
});

export default theme;
