import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

// Material UI components
import IconButton from '@material-ui/core/IconButton';

// Icons
import Search from '@material-ui/icons/Search';
import LocationOn from '@material-ui/icons/LocationOn';

// Project components
import SearchableDropDown from '../../../components/miscellaneous/SearchableDropdown';

const styles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: 8,
        paddingLeft: 12,
        boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.3)',
        height: 50,
    }
});

const customStyles = {
    control: (base, state) => ({
        ...base,
        border: '0 !important',
        // This line disable the blue border
        boxShadow: '0 !important',
        '&:hover': {
            border: '0 !important'
         }
    }),
    menu: () => ({
        backgroundColor: 'white',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderLeft: '1px solid white',
        borderRight: '1px solid white',
       /*  border: '1px solid rgba(0,0,0,0.1)',
        borderTop: '0 !important', */
        boxShadow: '0px 2px 1px 0px rgba(0,0,0,0.2)',
    }),
}

const SearchBar = (props) => {

    // Styling
    const classes = styles();

    return (
        <form onSubmit={props.onSubmit}>
            <div className={classes.root}>
                <Search className='mr-10'/>
                <SearchableDropDown
                    fullWidth
                    placeholder='Søk etter kommune'
                    styles={customStyles}
                    value={props.value}
                    onChange={props.onChange}
                    {...props}/>
                <IconButton onClick={props.onLocationClick}>
                    <LocationOn />
                </IconButton>
            </div>
        </form>
    )
};

SearchBar.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onLocationClick: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
    onSubmit: () => {},
};

export default (SearchBar);
