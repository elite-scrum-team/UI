import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {useState} from 'react';
import {withRouter} from 'react-router-dom';

// Service imports

// Material UI components
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons

// Project components
import WarningList from './WarningList';
import StatusTabs from './StatusTabs';

const styles = makeStyles({
    root: {
        minHeight: 400,
        paddingBottom: 100,
        '@media only screen and (min-width: 601px)': {
            width:450,
            maxWidth: 450,
            overflowX: 'hidden',
        },
        '@media only screen and (max-width: 600px)': {
            width: '100%'
        },
    },
    loginButton: {
        display: 'block',
        margin: 'auto',
        marginTop: 10
    },
    progress: {
        display: 'block',
        margin: 'auto',
        marginTop: 12,
    },
});

const SearchContent = props => {
    // Styling
    const classes = styles();

    const [section, setSection] = useState(0);

    const handleSectionChange = (val) => {
        if(props.onSectionChange) {
            props.onSectionChange(val);
        }
        setSection(val);
    }

    // Go to login
    const goTo = page => {
        props.history.push(page);
    };

    return (
        <div className={classes.root}>
            <StatusTabs value={section} onChange={handleSectionChange}/>  
            {props.isLoading ?
                <CircularProgress className={classes.progress}/> :
                <WarningList mountWarningCallback={(e) => props.mountWarningCallback(e)} items={props.items}
                                goTo={goTo}/>
            }
        </div>
    );
};

SearchContent.propTypes = {
    searchValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    goTo: PropTypes.func
};

export default withRouter(SearchContent);
