import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

import { Bar, Line } from 'react-chartjs-2';

// Material UI components
import { Typography, Paper } from "@material-ui/core";

// Icons

// Project components
import Navigation from '../../components/navigation/Navigation';



const styles = {
    root: {
        margin: '150px auto',
        maxWidth: 1000,
        width: '95wv',
    },
    row: {
        margin: '100px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    paper: {
        padding: 30,
    },
    chart: {
        width: '100%',
    }
}

class Statistics extends Component {


    render() {
        const {classes} = this.props;
        return <Navigation>
            <div className={classes.root}>
              <div className={classes.row}>
                <Paper className={classes.paper}>
                  <Typography variant="body1">YOLO</Typography>
                  <Typography variant="h1">5</Typography>
                </Paper>
                <Paper className={classes.paper}>
                  <Typography variant="body1">YODO</Typography>
                  <Typography variant="h1">5</Typography>
                </Paper>
              </div>
              <div className={classes.row}>
                <Paper className={classes.paper} style={{ width: "100%" }}>
                  <Typography variant="body1">Some chart</Typography>
                  <Bar className={classes.chart} data={{ dataset: { data: [1, 2, 3, 4], label: "My First dataset" }, labels: ["I", "want", "to", "die"] }} options={{}}/>
                </Paper>
              </div>
              <div>
                <Paper className={classes.paper} style={{ width: "100%" }}>
                    <Typography variant="body1">Some chart</Typography>
                    <Line className={classes.chart} data={{ dataset: { data: [1, 2, 3, 4], label: "My First dataset" }, labels: ["I", "want", "to", "die"] }} options={{}} />
                </Paper>
              </div>
            </div>
          </Navigation>;
    }
}


export default withStyles(styles)(Statistics);