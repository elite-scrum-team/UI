import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

// Material UI components
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// Project components
import Navigation from '../../components/navigation/Navigation';
import URLS from '../../URLS';
import Dinosaur from '../../assets/img/dinosaur.png';

const styles = theme => ({
  root: {},
  text: {
    display: 'flex',
    justifyContent: 'center'
  },
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: 6,
    marginRight: 6,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  imageWrapper: {
    display: 'block',
    margin: 'auto',
    '@media only screen and (max-width: 600px)': {
      maxWidth: 275
    }
  },
  image: {
    width: '100%',
    maxWidth: 450,
    height: 'auto',
    objectFit: 'cover',
    display: 'block',
    margin: 'auto'
  }
});

class NotFound extends Component {
  goToHome = () => {
    this.props.history.push(URLS.home);
  };
  render() {
    const { classes } = this.props;
    return (
      <Navigation>
        <div className={classes.root} />
        <div>
          <main className={classes.main}>
            <Paper className={classes.paper}>
              <Typography
                component='h2'
                variant='h1'
                className={classes.text}
              >
                404
              </Typography>
              <div className={classes.imageWrapper}>
                <img className={classes.image} src={Dinosaur} alt='dinosaur' />
              </div>
              <Typography
                variant='subtitle1'
                gutterBottom
                className={classes.text}
                noWrap
              >
                Oops! This Page Was Eaten By An Evil Dinosaur
              </Typography>
              <Button
                variant='contained'
                color='primary'
                className={classes.back}
                onClick={this.goToHome}
              >
                Oh no!!! Go back!
              </Button>
            </Paper>
          </main>
        </div>
      </Navigation>
    );
  }
}

export default withStyles(styles)(NotFound);
