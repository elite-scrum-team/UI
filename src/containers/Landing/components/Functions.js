import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import URLS from '../../../URLS';
import SearchBarStyles from './SearchBarStyles';
import classNames from 'classnames';

// Material UI components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

// Icons
import LocationIcon from '@material-ui/icons/LocationOn';
import FeedbackIcon from '@material-ui/icons/Feedback';
import PersonIcon from '@material-ui/icons/Person';

// Project components
import SearchableDropdown from '../../../components/miscellaneous/SearchableDropdown';

const styles = makeStyles({
    content: {
        paddingTop: 50,
        paddingBottom: 50,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 700,
    },
    input: {
        width: '80vw',
        maxWidth: 700,
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        margin: '0px 12px',
        maxWidth: 400,

        '@media only screen and (max-width: 600px)': {
            padding: '0px 2px',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',

            maxWidth: '90vw',
            overflow: 'hidden',
        }
    },
    button: {
        width: 176,
        padding: '6px 8px',

        '@media only screen and (max-width: 600px)': {
            fontSize: '0.8rem',
            padding: '6px 6px',
            width: 140,
        }
    },
    warning: {
        color: 'red',
    }
});

const warningTheme = createMuiTheme({
    palette: {
      primary: {
          main: '#b73a3a',
          contrastText: 'white',
      },

    },
    typography: {
      useNextVariants: true,
    },
  });


const Functions = (props) => {

    // Styling
    const classes = styles();

    return (
        <div className={classes.content}>
            <div className='mt-50'>
                <Typography variant='h6'>Søk etter varlser i din kommune</Typography>
            </div>
            <div className='pt-20 pb-20 w-100'>
                <SearchableDropdown
                    className={classes.input}
                    options={props.municipalities}
                    onChange={props.onMunicipalitySelected}
                    placeholder='Søk etter kommune'
                    styles={SearchBarStyles}
                />
            </div>
                <Typography variant='caption' align='center'>
                    eller
                </Typography>
            <div className='mt-15'>
                <Button
                    variant='extendedFab'
                    onClick={props.searchByLocation}
                    size='medium'
                    color='primary'>
                    <LocationIcon className='mr-5'/>
                    Søk med min posisjon
                </Button>
            </div>
        </div>
    )
}

Functions.propTypes = {
    searchByLocation: PropTypes.func.isRequired,
    onMunicipalitySelected: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,

    municipalities: PropTypes.array,
}

export default (Functions);
