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
          title={value.category ? value.category.name : 'Ukjent varsel'}
          status={value.status ? value.status.type : 0}
          description={value.description}
          image={value.images && value.images.length > 0 ? value.images[0] : null}
          posted={value.createdAt}
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
