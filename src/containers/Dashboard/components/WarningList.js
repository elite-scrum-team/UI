import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import URLS from '../../../URLS';

// Material UI components
import Typography from '@material-ui/core/Typography';

// Icons

// Project components
import WarningItem from '../../../components/layout/WarningItem';


const styles = makeStyles({
  root: {
    padding: '10px 4px'
  }
});

const WarningList = props => {
  // Styling
  const classes = styles();

  const warnings = props.items || [];

  const onClick = (e, value) => {
    props.mountWarningCallback(value.id);
    props.goTo(URLS.dashboard.concat(value.id));
  }

  return (
    <div className={classes.root}>
      {warnings.map((value, index) => (
        <WarningItem
          key={value.id || index}
          id={value.id}
          onClick={(e) => onClick(e, value)}
          title={value.category.name}
          status={value.status.type}
          description={value.description}
        />
      ))}
      {warnings.length === 0 && (
        <Typography variant='subtitle1' align='center'>
          Ingen varsel å vise
        </Typography>
      )}
    </div>
  );
};

WarningList.propTypes = {
  items: PropTypes.array,
  goTo: PropTypes.func
};

WarningList.defaultProps = {
  goTo: () => {}
};

export default WarningList;
