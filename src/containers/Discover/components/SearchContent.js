import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import {withRouter} from 'react-router-dom';
import URLS from '../../../URLS';

// Service imports
import AuthService from '../../../api/services/AuthService';

// Material UI components
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons

// Project components
import SearchBar from './SearchBar';
import WarningList from './WarningList';

const styles = makeStyles({
    root: {
        backgroundColor: 'white',
        minHeight: 600,
        paddingBottom: 100,
    },
    loginButton: {
        display: 'block',
        margin: 'auto',
        marginTop: 10,
    },
    progress: {
        display: 'block',
        margin: 'auto',
        marginTop: 12,
    },
    search: {
        width: '100%',
    }
});

const SearchContent = (props) => {

    // Styling
    const classes = styles();

    const [section, setSection] = useState(0);

    // Go to login
    const goTo = (page) => {
        props.history.push(page);
    };

    const changeSection = (value) => {
        if(props.onSectionChange) {
            props.onSectionChange(value);
        }
        setSection(value);
    };

    return (
        <div className={classes.root}>
            <AppBar position='sticky' color='secondary'>
                <Tabs
                    value={section}
                    onChange={(e, val) => changeSection(val)}
                    centered={true}
                    variant='fullWidth'>
                    <Tab label='Søk varsler' value={0}/>
                    <Tab label='Mine varsler' value={1}/>
                </Tabs>
            </AppBar>
            {section === 0 &&
                <div>
                    <SearchBar
                        className={classes.search}
                        value={props.searchValue}
                        onChange={props.onSubmit}
                        options={props.municipalities}
                        onLocationClick={props.onLocation}/>
                    {props.isLoading ? <CircularProgress className={classes.progress}/> : props.detail ?
                        <WarningList items={props.items} detail={props.detail}/> : <WarningList items={props.items} goTo={goTo}/>}
                </div>
            }

            {section === 1 &&
            <div>
                {AuthService.isAuthenticated() ?
                    <div>
                        {props.isLoading ? <CircularProgress className={classes.progress}/> : props.detail ?
                            <WarningList items={props.items} detail={props.detail}/> : <WarningList items={props.items} goTo={goTo}/>  }
                    </div>
                :
                    <div className='mt-30 p-5'>
                        <Typography variant='subtitle2' align='center'>Du må logge inn for å se dine varsler!</Typography>
                        <Button className={classes.loginButton} onClick={() => goTo(URLS.login)} variant='contained' color='primary'>Logg inn</Button>
                    </div>
                }
            </div>}
        </div>
    )
}

SearchContent.propTypes = {
    searchValue: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    onLocation: PropTypes.func,
    goTo: PropTypes.func,
}

export default withRouter(SearchContent);
