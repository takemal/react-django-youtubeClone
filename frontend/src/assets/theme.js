import { createTheme } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
// Pick colors on https://material.io/resources/color/#!/

export const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: '"Comic Neue",cursive',
  },
});
