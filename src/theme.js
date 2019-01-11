import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    typography: {
      useNextVariants: true,
    },

    palette: {
      primary: {
        main: '#008899',
        dark: '#007c91',
        light: '#5ddef4',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#ffffff',
        contrastText: '#ffffff',
      }
    }
});