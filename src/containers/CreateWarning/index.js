import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/styles';

// Material UI components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Material UI components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "../../../node_modules/@material-ui/core/ListItemIcon/ListItemIcon";
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';

// Icons
import FolderIcon from '@material-ui/icons/Folder';

//Project components
import Navigation from '../../components/navigation/Navigation';
import Step from './components/Step';
import CategoryDialog from './components/CategoryDialog';



const styles = {
    root: {},
    card: {
        maxWidth: '400px',
        margin: 'auto',
    },
    button: {
        // left: '50px',
    },
    right: {
        marginLeft: '50px',
    }
}



class CreateWarning extends Component {

    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;

        return (
            <Navigation>
                <Card className={classes.card}>
                    <CardContent>
                        <Step number={1} step={'Kategori'} description={'Velg den kategorien som passer best.'}/>
                        <div className={classes.right}>
                            <Button variant="outlined" className={classes.button} onClick={this.handleClickOpen}>
                                heyyo
                            </Button>
                            <Dialog
                                onClose={this.handleClose}
                                aria-labelledby='customized-dialog-title'
                                open={this.state.open}>
                                <CategoryDialog/>
                            </Dialog>
                        </div>

                        <Divider/>

                        <Step number={2} step={'Posisjon'} description={'Sett en markør der det gjelder.'}/>

                        <Divider/>

                        <Step number={3} step={'Beskrivelse'} description={'Lag en kort beskrivelse for problemet.'}/>

                        <Divider/>

                        <Step number={4} step={'Bildeee'} description={'Sett en markør der det gjelder.'}/>





                    </CardContent>
                </Card>
            </Navigation>
        )
    }
}

export default withStyles(styles)(CreateWarning);