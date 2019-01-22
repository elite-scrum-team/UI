import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Lodash from 'lodash'

// Material UI components
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden'
// Icons
import Clear from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

// Project components
import InformationCard from './InformationCard'
import Image from './Image'
import Map from '../../../components/miscellaneous/Map';

const styles = makeStyles({
    root: {
       height:'auto',
        width: 'auto'
    },
    wrapper:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        minHeight: 200,
        overflow: 'auto',
        marginTop:60,

        '@media only screen and (max-width: 960px)': {
            position: 'absolute',
            top: 0, left: 0, right: 0,
            paddingTop: 0,
        }
    },
    endOfText:{
        width:'90%',
        marginBottom: 30,
        display:'flex',
        justifyContent: 'flex-end'
    },
    close:{
        width:'90%',
        display:'flex',
        justifyContent: 'flex-end',
        '@media only screen and (max-width: 960px)': {
            width:'95%',
        }
    },
    mapContainer: {
        width: '90%',
        height: 250,
        maxWidth: '450px',
        maxHeight: '350px',
        marginBottom: 50,
    },
    text:{
        '@media only screen and (max-width: 960px)': {
            fontSize:35,
            justifyContent: 'center'
        }
    }
});

const DetailCard = (props) => {
    // Styling
    const classes = styles();
    const event = props.event || {};

    const loc = [];

    loc[0] = event;

    return (
        <div className={classNames(classes.root)}>
            <div className={classes.wrapper}>
                <div className={classes.close}>
                    <IconButton onClick={() => props.close(null)}>
                        <Clear/>
                    </IconButton>
                </div>

                <Typography variant='h3' className={classes.text} noWrap={false}>
                    {event.title}
                    </Typography>

                {event.images && event.images.length > 0 ? <Image image={event.images}/> : null}
            <InformationCard event={event}/>
            <div className={classes.endOfText}>
            <Typography>
                {event.description}
            </Typography>
            </div>
                <div className={classes.mapContainer}>
                    {
                        (!Lodash.isEmpty(loc[0])) ?  <Map defaultCenter={event.location} zoom={13} locations={loc} showMarkers={true} /> :null
                    }

                </div>

            </div>
        </div>
    )
};

DetailCard.propTypes = {

};

export default (DetailCard);
