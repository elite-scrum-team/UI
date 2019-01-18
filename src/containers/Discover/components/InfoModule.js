import React from 'react';
import { makeStyles } from '@material-ui/styles';
import URLS from '../../../URLS';

// Material UI components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Icons
import LOGO from '../../../assets/img/logo.png';

// Project components

const styles = makeStyles({
    root: {
        padding: 22,
    },
    logo: {
        width: '100%',
        maxWidth: 200,
        height: 'auto',
        maxHeight: 200,
        objectFit: 'cover',

        display: 'block',
        margin: 'auto',
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'space-between',

        marginTop: 22,
        maxWidth: 300,
        margin: 'auto',
    }
});

const InfoModule = (props) => {
 
    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <img className={classes.logo} src={LOGO} alt='HverdagsHelt Logo'/>
            <div>
                <Typography variant='h6' align='center'>Varsle din kommune om dine kommunale problemer</Typography>
            </div>
            <div className={classes.buttonWrapper}>
                <Button onClick={() => props.goTo(URLS.createwarning)} variant='contained' color='primary'>Send varsel</Button>
                <Button onClick={() => props.goTo(URLS.login)} variant='contained' color='primary'>Registrer</Button>
            </div>
        </div>
    )
}

export default (InfoModule);