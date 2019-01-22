import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

// Material UI components
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/es/Typography/Typography';

// Icons

// Project components
import ClickableImage from '../miscellaneous/ClickableImage';

const styles = makeStyles({
  root: {
    paddingTop: 4
  },
  userInfo: {
    alignItems: 'center',
    display: 'flex',
    padding: 7
  },
  relative: {
    position: 'relative'
  },
  userName: {
    paddingLeft: 5,
    color: 'gray'
  },
  commentText: {
    padding: 10,
    marginLeft: 40,
    whiteSpace: 'pre-line'
  },
  topright: {
    position: 'absolute',
    top: 4,
    right: 8
  },
  image: {
    width: 300,
    height: 'auto',
    objectFit: 'cover',

    '@media only screen and (max-width: 600px)': {
      width: '100%'
    }
  }
});

const CommentSection = props => {
  // State
  const time = props.commentDate
    ? moment(props.commentDate).fromNow()
    : 'Ukjent';

  // Styling
  const classes = styles();

  return (
    <div className={classes.root}>
      <Paper elevation={1} square>
        <div className={classes.relative}>
          <div className={classes.userInfo}>
            <Avatar>A</Avatar>
            <Typography className={classes.userName}>
              {props.username || 'Anonymous'}
            </Typography>
          </div>
          <Typography className={classes.commentText}>
            {props.breadtext}
          </Typography>
          <ClickableImage className={classes.image} image={props.image} />
          <Typography variant={'caption'} className={classes.topright}>
            {time}
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

CommentSection.propTypes = {
  commentDate: PropTypes.string,
  breadtext: PropTypes.string,
  username: PropTypes.string
};

export default CommentSection;
