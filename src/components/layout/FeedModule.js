import React from 'react';
import { makeStyles } from '@material-ui/styles';
import warningUtils from '../../utils/warningUtils';

// Services
import AuthService from '../../api/services/AuthService';

// Material UI components
// Icons

// Project components
import CommentBox from './CommentBox';
import StatusBox from './StatusBox';
import CompanyBox from './CompanyBox';
import PropTypes from 'prop-types';
import CommentSection from './CommentSection';

const styles = makeStyles({
  root: {}
});

const FeedModule = props => {
  // Styling
  const classes = styles();

  return (
    <div className={classes.root}>
      {AuthService.isAuthenticated() && <CommentBox id={props.id} onCommentCreated={props.onCommentCreated} />}
      {props.items &&
        props.items.map((item, index) => {
          if (item.type === 'statuses') {
            return (
              <StatusBox
                key={item.data.id}
                date={item.data.createdAt}
                province={item.data.province}
                status={item.data.type}
                statusMessage={item.data.description}
                statustekst={warningUtils.statusNames[item.data.type]}
              />
            );
          } else if (item.type === 'comments') {
            return (
              <CommentSection
                key={item.data.id}
                username={item.data.username}
                breadtext={item.data.content}
                commentDate={item.data.createdAt}
                image={item.data.fileURL}
              />
            );
          } else if (item.type === 'contracts') {
            return (
              <CompanyBox
                key={item.data.id}
                breadtext={item.data.comment}
                date={item.data.createdAt}
                companyName={item.data.name}
              />
            );
          } else {
            return null;
          }
        })}
    </div>
  );
};

FeedModule.propTypes = {
  id: PropTypes.string,
  items: PropTypes.array
};

export default FeedModule;
