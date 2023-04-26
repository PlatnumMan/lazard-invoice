import { createTheme } from '@mui/material';

export const customTheme = createTheme({
  palette: {
    background: {
      default: '#f8f9fa',
    },
    indigo: {
      main: '#6610f2',
    },
    organge: {
      main: '#fd7e14',
    },
    green: {
      main: '#28a745',
    },
    blue: {
      main: '#007bff',
    },
    yellow: {
      main: '#ffc107',
    },
    darkRed: {
      main: '#dc3545',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0000000',
          color: '#fff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0000000',
          color: '#fff',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '1.2rem',
        },
      },
    },
  },
});
