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
import Button from "@material-ui/core/Button";

const drawerWidth = 450;

const styles = makeStyles({
    root: {
        width: drawerWidth,

        '@media only screen and (max-width: 800px)': {
            width: '100%',
            marginTop: 48,
        }
    },
    flex: {
        paddingTop:'30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    image: {
       marginTop: 30,
       width: '100%',
       height: 'auto',
       maxWidth: 400,
       objectFit: 'cover',
       
       display: 'block',
       margin: 'auto',
    },
    tabs: {
        height: 50,
    },
    tab: {
        height: 50,
    },
    margin: {
        marginTop: 14,
    },
    buttonWrapper: {
        width: "50%"
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

    console.log("DRAWER");

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
                        className={classes.tabs}
                        value={0}
                        centered={true}
                        variant='fullWidth'>
                        <Tab className={classes.tab} label='Gå tilbake' onClick={() => props.nextdetail()}/>
                        <Tab className={classes.tab} label='Les mer' onClick={() => props.goTo(URLS.details.concat(props.item.id))}/>
                    </Tabs>
                </AppBar>
                <div className={classes.flex}>
                    <Typography variant='h3'>{props.item.category.name}</Typography>
                    <InformationCard status={`Status: ${statusName}`} color={statusClasses} time={time} municipality={props.item.municipality}/>
                    <TextCard text={props.item.description}/>
                    <TextCard text={props.item.status.description} gray/>
                    {props.item.images && props.item.images.length > 0 ?
                        <img className={classes.image} src={props.item.images[0]} alt={props.item.category.name}/> : null }

                    <div className={classes.buttonWrapper}>
                        <Button variant="outlined" color="primary"
                                className={classes.margin} onClick={() => props.goTo(URLS.details.concat(props.item.id))}
                                fullWidth
                        >

                            Les mer
                        </Button>
                    </div>

                </div>

                </div>
                }
            </Drawer>
        </div>
    )
}

export default (SmallDetail);
