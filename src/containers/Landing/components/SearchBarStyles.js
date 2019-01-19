const customStyles = {
  control: (provided) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,

    '@media only screen and (min-width: 600px)': {
        height: 60,
    }
  }),
};

export default customStyles;