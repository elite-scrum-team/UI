import React from 'react';
import Select from 'react-select'

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
// ]

const SearchableDropdown = (props) => (
    <Select options={props.options} menuPortalTarget={document.body}  styles={{ menuPortal: base => ({ ...base, zIndex: 200000 }) }} />
);

export default (SearchableDropdown);