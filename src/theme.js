import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    typography: {
      useNextVariants: true,
    },

    palette: {
      primary: {
        main: '#00acc1',
        dark: '#007c91',
        light: '#5ddef4',
        contrastText: '#ffffff',
      }
    }
});