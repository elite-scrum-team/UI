import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/styles';

// Material UI Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


// Icons
import FolderIcon from '@material-ui/icons/Folder';


// Project Components
import Navigation from '../../components/navigation/Navigation';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "../../../node_modules/@material-ui/core/ListItemIcon/ListItemIcon";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';



const styles = {
    root: {},
    card: {
        maxWidth: '400px',
        margin: 'auto',
    },
    button: {}
}

function generate(element) {
    return [0, 1, 2].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
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
        this.setState({ open: false });
    };

    render() {
        const {classes} = this.props;

        return (
            <Navigation>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Opprett varsel
                        </Typography>
                        <Typography component="p">
                            Velg kategori
                        </Typography>
                        <Button variant="outlined" className={classes.button} onClick={this.handleClickOpen}>
                            heyyo
                        </Button>
                        <Dialog
                            onClose={this.handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={this.state.open}>
                        <ItemsList/>
                        </Dialog>

                        <Divider/>

                    </CardContent>
                </Card>
            </Navigation>
        )
    }
}


const ItemsList = withStyles(styles)((props) => {

    const [data, setData] = useState({});

    const {classes} = props;

    return (
        <Card className={classes.card}>
            <List>
                {generate(
                <ListItem
                    button
                    >
                    <ListItemIcon>
                        <FolderIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary="item"
                    />
                </ListItem>
                )}
            </List>
        </Card>
    );
});

export default withStyles(styles)(CreateWarning);