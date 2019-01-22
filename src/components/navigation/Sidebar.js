import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import URLS from '../../URLS';
import theme from '../../theme';

// Auth Service
import AuthService from '../../api/services/AuthService';

// Material UI Components
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// Project Components

const styles = makeStyles({
    root: {
        marginTop: 48,
        zIndex: 100,
    },
    item: {
        height: 46,
        color: 'var(--tihlde-blaa)',
    },
    companyButton: {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        boxSizing: 'border-box',
        border: '5px solid white',

        '&hover': {
            backgroundColor: 'rgba(0,0,0,0.3)',
        },
    },
    menuButton: {
        color: 'white',
    },
});

const ActionLink = (props) => {
    const classes = styles();
    return (
        <Fragment>
            <ListItem className={classNames(classes.item, props.className)} button color='inherit' onClick={props.onClick}>
                <Grid container direction='column' wrap='nowrap' alignItems='center' justify='space-between'>
                    <Typography variant='subtitle1' align='center' color='inherit'>{props.label}</Typography>
                </Grid>
            </ListItem>
            <Divider className={classes.divider}/>
        </Fragment>
    );
};

ActionLink.propTypes = {
    onClick: PropTypes.func.isRequired,
};

const SidebarContent = (props) => {
    const classes = styles();

    const goTo = (page) => {
        props.history.push(page);
    };

    return (
        <Fragment>
            <div className={classes.root}>
                <ActionLink onClick={() => goTo(URLS.createwarning)} label='Ny varsel' />
                <ActionLink onClick={() => goTo(URLS.events)} label='Nyheter'/>
                <ActionLink onClick={() => goTo(URLS.discover)} label='Discover' />
                {AuthService.isCompanyOrEmployee() &&
                    <Fragment>
                        <ActionLink onClick={() => goTo(URLS.statistics)} label='Statistikk'/>
                        <ActionLink onClick={() => goTo(URLS.dashboard)} label='Dashboard'/>
                    </Fragment>
                }
                {AuthService.isAuthenticated() &&
                    <Fragment>
                        <ActionLink onClick={() => goTo(URLS.profile)} label='Instillinger'/>
                    </Fragment>
                }
                {AuthService.isAuthenticated() ?
                    <ActionLink onClick={props.logOut} label='Logg ut'/>
                    :
                    <ActionLink onClick={() => goTo(URLS.login)} label='Logg inn'/>
                }
            </div>
        </Fragment>
    );
};

SidebarContent.propTypes = {
    classes: PropTypes.object,
    logOut: PropTypes.func.isRequired,
};

export default withRouter(SidebarContent);