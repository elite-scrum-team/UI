import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    typography: {
      useNextVariants: true,
    },

    palette: {
      primary: {
        main: '#009688', // '#008899',
        dark: '#03796e', //'#007c91',
        light: '#5ddef4',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#ffffff',
        contrastText: '#000000',
      }
    }
});