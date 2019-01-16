import React from 'react';
import Select from 'react-select'
import PropTypes from "prop-types";

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
// ]



const SearchableDropdown = (props) => {

    const handleChange = (event) => {
        props.onChange(event);
    };

    return (
        <Select options={props.options}
                menuPortalTarget={document.body}
                styles={{menuPortal: base => ({...base, zIndex: 200000})}}
                onChange={handleChange}
        />
    )
};

SearchableDropdown.propTypes = {
    onChange: PropTypes.func,
};

export default (SearchableDropdown);