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
import MapStep from '../../../components/layout/MapStep';

const styles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        minHeight: 200,
        overflow: 'auto',

        '@media only screen and (max-width: 960px)': {
            position: 'absolute',
            top: 0, left: 0, right: 0,
            paddingTop: 0,
        }
    },
    avslutt: {
        width: '90%',
    },
    closeBtn: {
        right:0
    },
    endOfText:{
        width:'80%',
    },
});

const DetailCard = (props) => {
    // Styling
    const classes = styles();
    const event = props.event || {};

    return (
        <div className={classNames(classes.root)}>
            <div className={classes.avslutt}>
                <IconButton className={classes.closeBtn} onClick={() => props.close(null)}>
                    <Clear/>
                </IconButton>
            </div>
            <Typography variant='h3' className={classes.down}>
                {event.title}
            </Typography>
            {event.images && event.images.length > 0 ? <Image image={event.images}/> : null}
            <InformationCard event={event}/>
            <div className={classes.endOfText}>
            <Typography>
                {event.description}
            </Typography>
            </div>
        </div>
    )
};

DetailCard.propTypes = {

};

export default (DetailCard);
