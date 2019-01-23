import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import moment from 'moment'

// Material UI components
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import Chip from '@material-ui/core/Chip';
// Icons
import LocationIcon from '@material-ui/icons/LocationOn';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import TimeIcon from '@material-ui/icons/AccessTime';
import BankIcon from '@material-ui/icons/AccountBalance';
import URLS from "../../../URLS";


// Project components

const relocate = (link) =>{
    if(link.includes('http://') || link.includes('https://')){
        window.open(link)
    }else{
        window.open('http://'.concat(link));
    }
};

const styles = makeStyles({
    root: {
        backgroundColor: 'white',
        marginTop: 20,
        width: '90%',
        padding:'70px 0 70px 0',
    },
    icons: {
        display: 'flex',
        flexDirection: 'column',
        marginRight:30
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center'
    },
    mr:{
        marginRight: 10
    }
}
);

const IconCarry = (props) =>{

    const classes = styles();

    return (
        <div className={classes.info}>
            <div className={classes.mr}>
            {props.second}
            </div>
            <Typography> {props.first} </Typography>
        </div>
    )
};

const DetailCard = (props) => {
    const event = props.event;

    const fromTime = moment(event.fromTime).format('HH:mm:ss');
    const toTime = moment(event.toTime).format('HH:mm:ss');
    const time = `${fromTime} - ${toTime}`;

    const fromDate = moment(event.fromTime).format('MMMM Do YYYY');
    const toDate = moment(event.toTime).format('MMMM Do YYYY');

    const location = event.city ? event.city : "Ukjent Kommune";
    // Styling
    const classes = styles();

    return (
        <div className={classNames(classes.root, props.className)}>
            <div className={classNames(classes.icons)}>
                {(fromDate === toDate)?
                    <div>
                        <IconCarry first={time} second={<TimeIcon/>}/>
                        <IconCarry first={fromDate} second={<CalendarIcon/>}/>
                    </div> :
                    <div>
                        <Typography>from: </Typography>
                        <IconCarry first={fromTime} second={<TimeIcon/>}/>
                        <IconCarry first={fromDate} second={<CalendarIcon/>}/>
                        <Divider/>
                        <Typography>To: </Typography>
                        <IconCarry first={toTime} second={<TimeIcon/>}/>
                        <IconCarry first={toDate} second={<CalendarIcon/>}/>
                    </div>
                }
                <Divider/>
                <IconCarry first={location} second={<BankIcon/>}/>
                <IconCarry first={event.street} second={<LocationIcon/>}/>
            </div>
            <Chip  label="Besøk nettsiden" onClick={() => relocate(props.event.link)}/>
            <Chip  label="Rediger" onClick={() => props.goTo(URLS.createnews.concat(event.id))}/>

        </div>
    )
};

DetailCard.propTypes = {

};

export default (DetailCard);
