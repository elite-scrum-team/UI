import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/styles';

// Material UI components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';


// Icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';


//Project components
import Navigation from '../../components/navigation/Navigation';
import Step from './components/Step';
import CategoryDialog from './components/CategoryDialog';
import Map from '../../components/miscellaneous/Map';
import MapStep from './components/MapStep'


const styles = {
    root: {},
    card: {
        maxWidth: '600px',
        margin: 'auto',
        marginTop: '100px',
    },
    button: {
        // left: '50px',
    },
    mapContainer: {
        width: 450,
        height: 350,
        maxWidth: '450px',
        maxHeight: '350px',
    },
    right: {
        marginLeft: '50px',
    },
    imageDiv: {
        maxWidth: '450px',
        maxHeight: '350px',
        position: 'relative',
        marginTop: '30px',
        marginRight: '30px',
    },
    image: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        maxWidth: '100%',
        maxHeight: '300px',
    },
    deleteImg: {
        right: '-20px',
        top: '-20px',
        position: 'absolute',
    }
}


class CreateWarning extends Component {

    state = {
        open: false,
        images: [],
        imageFiles: [],
        category: null,
        location: null,
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClickDelete = index => {
        // Check if index is a valid index
        if (index < 0 || index >= this.state.images.length) {
            return;
        }

        const images = Object.assign([], this.state.images);
        const imageFiles = Object.assign([], this.state.imageFiles);
        images.splice(index, 1);
        imageFiles.splice(index, 1);

        this.setState({images: images, imageFiles: imageFiles});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onImageChange = (event) => {
        console.log(event.target.files);
        // Function for reading and adding an image
        const readImage = (file) => {
            let reader = new FileReader();
            reader.onload = (e) => {
                const images = Object.assign([], this.state.images);
                images.push(e.target.result);

                const imageFiles = Object.assign([], this.state.imageFiles);
                imageFiles.push(file);

                this.setState({images: images, imageFiles: imageFiles});
                console.log(this.state.images);
            };

            reader.readAsDataURL(file);
        }

        // Read images
        if (event.target.files && event.target.files[0]) {


            [].forEach.call(event.target.files, readImage)
            // for(let i = 0; i < event.target.files.length; i++) {
            //     reader.readAsDataURL(event.target.files[i]);
            // }
            //event.target.files.forEach((image) => );

        }
    }

    mapClickCallback = (data) => {
        console.log(data);
        this.setState({location: data});
    }

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
                        <div className={classes.right}>
                            <MapStep location={this.state.location} mapMarkerCallback={(e) => this.mapClickCallback(e)}/>
                        </div>
                        <Divider/>

                        <Step number={3} step={'Beskrivelse'} description={'Lag en kort beskrivelse for problemet.'}/>
                        <div className={classes.right}>
                            <TextField
                                id='outlined-multiline-flexible'
                                label='Multiline'
                                multiline
                                rowsMax='4'
                                value={this.state.multiline}
                                onChange={this.handleChange('multiline')}
                                className={classes.textField}
                                margin='normal'
                                helperText=''
                                variant='outlined'
                            />
                        </div>
                        <Divider/>
                        <Step number={4} step={'Bilde'}
                              description={'Last opp eventuelle bilder som beskriver problemet.'}/>
                        <div className={classes.right}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                style={{display: 'none'}}
                                id="upload-button"
                                multiple
                                type="file"
                                onChange={this.onImageChange}
                            />
                            <div>
                                <label htmlFor="upload-button">
                                    <Fab color="primary" aria-label="Add" component="span" className={classes.button}>
                                        <AddIcon/>
                                    </Fab>
                                </label>
                            </div>
                            {this.state.images.map((img, index) => (
                                <div className={classes.imageDiv} key={index}>
                                    <img className={classes.image} id="target" src={img}/>
                                    <Fab className={classes.deleteImg} value={index}
                                         onClick={() => this.handleClickDelete(index)} color="secondary" size='small'
                                         aria-label="Add" component="span">
                                        <DeleteIcon/>
                                    </Fab>
                                </div>
                            ))}

                        </div>

                    </CardContent>
                </Card>
            </Navigation>
        )
    }
}

export default withStyles(styles)(CreateWarning);