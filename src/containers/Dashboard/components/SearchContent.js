import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import URLS from '../../../URLS';

// Service imports
import AuthService from '../../../api/services/AuthService';

// Material UI components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Icons

// Project components
import SearchBar from './SearchBar';
import WarningList from './WarningList';
import StatusTabs from './StatusTabs';

const styles = makeStyles({
  root: {
    minHeight: 400,
    width: 325
  },
  loginButton: {
    display: 'block',
    margin: 'auto',
    marginTop: 10
  }
});

const SearchContent = props => {
  // Styling
  const classes = styles();

  const [section, setSection] = useState(0);

  // Go to login
  const goTo = page => {
    console.log(props);
    props.history.push(page);
  };

  return (
    <div className={classes.root}>
      <StatusTabs value={section} onChange={val => setSection(val)} />
      {section === 0 && (
        <div>
          <SearchBar
            value={props.searchValue}
            onChange={props.onChange}
            onSubmit={props.onSubmit}
          />

          <WarningList mountWarningCallback={(e) => props.mountWarningCallback(e)} items={props.items} goTo={goTo} />
        </div>
      )}
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
