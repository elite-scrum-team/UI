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
    description: {
        //width: 350,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 35,
        paddingRight: 35,
        textAlign: 'center',
        color: 'grey',
        fontStyle: 'italic',

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
    };

    // Go to login
    const goTo = page => {
        props.history.push(page);
    };

    return (
        <div className={classes.root}>
            <StatusTabs value={section} onChange={handleSectionChange}/>
            {props.municipalityEmployee &&
                <div className={classes.description}>
                    {section === 0 ? 'Her finner du nye varsler i din kommune som må godkjennes før vanlige brukere kan se dem.' : null}
                    {section === 1 ? 'Her finner du varsler som er publisert for offentligheten, men som ikke er ordnet enda.' : null}
                    {section === 2 ? 'Her finner du varsler hvor problemet er løst, samt varsler som er markert som useriøse eller duplikater.' : null}
                </div>
            }
            {!props.municipalityEmployee &&
            <div className={classes.description}>
                {section === 0 ? 'Her finner du nye varsler i din kommune som er tildelt din gruppe.' : null}
                {section === 1 ? 'Her finner du varsler tildelt din gruppe som er publisert for offentligheten, men som ikke er ordnet enda.' : null}
                {section === 2 ? 'Her finner du varsler tildelt din gruppe hvor problemet er løst, samt varsler som er markert som useriøse eller duplikater.' : null}
            </div>
            }
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
