import React from 'react';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import URLS from '../../../URLS';

// Material UI components
import Drawer from '@material-ui/core/Drawer';

// Icons

// Project components
import InformationCard from './InformationCard'
import TextCard from './TextCard'

// @MaterialUI
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography"
import CircularProgress from '@material-ui/core/CircularProgress';
import warningUtils from "../../../utils/warningUtils";

const drawerWidth = 450;

const styles = makeStyles({
    root: {
        width: drawerWidth,
    },
    flex: {
        paddingTop:'30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

const SmallDetail = (props) => {
    // Styling
    const classes = styles();

    const time = props.item.createdAt ? moment(props.item.createdAt).fromNow() : 'Ukjent';
    const type = props.item.status.type;

    // Initialize status settings
    const statusCode = type  !== undefined && type >= 0 && type <= 4 ? type : 0;
    const statusName = warningUtils.statusNames[statusCode];

    let statusClasses = warningUtils.getAllStatusClasses;
    statusClasses = statusClasses.map((s) => s());
    statusClasses = statusClasses[statusCode];

    return (
        <div className={classes.root}>
            <Drawer
                variant='permanent'
                classes= {{
                    paper: classes.root,
                }}>
                {(typeof props.item === 'undefined')? <CircularProgress className={classes.progress}/> :
                <div>
                <AppBar position='static' color='secondary'>
                    <Tabs
                        value={0}
                        centered={true}
                        variant='fullWidth'>
                        <Tab label='Gå tilbake' onClick={() => props.nextdetail()}/>
                        <Tab label='Les mer' onClick={() => props.goTo(URLS.details.concat(props.item.id))}/>
                    </Tabs>
                </AppBar>
                <div className={classes.flex}>
                    <Typography variant='h3'>{props.item.category.name}</Typography>
                    <InformationCard status={`status: ${statusName}`} color={statusClasses} time={time} municipality={props.item.municipality}/>
                    <TextCard text={props.item.description}/>
                    <TextCard text={props.item.status.description} gray/>
                </div>
                </div>
                }
            </Drawer>
        </div>
    )
}

export default (SmallDetail);
