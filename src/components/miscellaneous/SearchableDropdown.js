import React from 'react';
import Select from 'react-select'
import PropTypes from "prop-types";

const SearchableDropdown = (props) => {

    const handleChange = (event) => {
        if(props.onChange) {
            props.onChange(event);
        }
    };

    return (
        <Select   
            {...props}
            className={props.className}
            options={props.options}
            menuPortalTarget={document.body}
            styles={{
                ...props.styles || {},
                menuPortal: base => ({...base, zIndex: 200000})
            }}
            onChange={handleChange}
        />
    )
};

SearchableDropdown.propTypes = {
    onChange: PropTypes.func,
};

export default (SearchableDropdown);