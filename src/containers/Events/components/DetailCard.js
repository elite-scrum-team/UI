import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

// Material UI components
import Typography from '@material-ui/core/Typography';

// Icons

// Project components
import InformationCard from './InformationCard'
import Image from './Image'
import IconButton from "@material-ui/core/IconButton";
import Clear from "../../../../node_modules/@material-ui/icons/Clear";


const styles = makeStyles({
    root: {
        display: 'flex',
        backgroundColor: 'white',
        minHeight: 200,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 32,
        paddingBottom: 100,

        '@media only screen and (max-width: 960px)': {
            position: 'absolute',
            top: 0, left: 0, right: 0,
            paddingTop: 0,
        }
    },
    avslutt: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        width: '90%',
        paddingTop: 10
    },
    closeBtn: {
        height: '100%',
    }
});

const DetailCard = (props) => {
    // Styling
    const classes = styles();
    const event = props.event || {};

    return (
        <div className={classNames(classes.root, props.className)}>
            <div className={classes.avslutt}>
                <IconButton className={classes.closeBtn} onClick={() => props.close(null)}>
                    <Clear/>
                </IconButton>
            </div>
            <Typography variant='h3'>
                {event.title}
            </Typography>
            <InformationCard event={event}/>
            {event.images && event.images.length > 0 ? <Image image={event.images}/> : null}
            <Typography>
                {event.description}
            </Typography>
        </div>
    )
};

DetailCard.propTypes = {

};

export default (DetailCard);
