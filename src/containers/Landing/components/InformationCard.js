import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

// Material UI components
import Drawer from '@material-ui/core/Drawer';

// Icons
import LocationIcon from '@material-ui/icons/LocationOn';
import TimeIcon from '@material-ui/icons/AccessTime';

// Project components

import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography"


const styles = makeStyles({
    root: {
        width: '80%',

    },
    flex: {
        paddingTop:10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    chip: {
        width: 200
    },
    inf:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    padd: {
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});

const InformationCard = (props) => {
    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <div className={classes.flex}>
                <Chip
                    label={props.status}
                    className={classNames(classes.chip, props.color.color)}
                />
                <div className={classNames(classes.inf)}>

                    <div className={classes.padd}>
                        <TimeIcon className='mr-10'/>
                        <Typography variant='caption'>{props.time}</Typography>
                    </div>

                    <div className={classes.padd}>
                        <Typography variant='caption'>{props.municipality}</Typography>
                        <LocationIcon className='ml-10'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default (InformationCard);
