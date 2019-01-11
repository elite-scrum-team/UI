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
import CategoryStep from './components/CategoryStep';
import MapStep from './components/MapStep';
import DescriptionStep from './components/DescriptionStep';
import PictureStep from './components/PictureStep';
import Typography from '@material-ui/core/Typography';
import ConfirmDialog from './components/ConfirmDialog';


const styles = {
    root: {},
    card: {
        maxWidth: '600px',
        margin: 'auto',
        marginTop: '100px',
        marginBottom: '50px',

    },
    button: {
        // left: '50px',
    },
    title: {
        textAlign: 'center',
        marginTop: '30px',
        marginBottom: '30px',
        fontWeight: '4',
    },
    mapContainer: {
        width: 450,
        height: 350,
        maxWidth: '450px',
        maxHeight: '350px',
    },
    right: {
        marginLeft: '50px',
        marginBottom: '20px',
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
    },
    registerButton: {
        margin: 'auto',
        display: 'block',
        marginTop: '30px',
        marginBottom: '10px',
    }
}


class CreateWarning extends Component {

    state = {
        open: false,
        images: [],
        imageFiles: [],
        category: null,
        description: '',
        location: null,
        confirmDialogOpen: false,
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    openConfirmDialog = () => {
        this.setState({
            confirmDialogOpen: true,
        })
    }

    closeConfirmDialog = () => {
        this.setState({
            confirmDialogOpen: false,
        })
    }

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

    setCategory = (data) => {
        console.log(data);
        this.setState({category: data})
    }

    mapClickCallback = (data) => {
        console.log(data);
        this.setState({location: data});
    }

    setDescription = (data) => {
        console.log(data);
        this.setState({description: data});
    }

    render() {
        const {classes} = this.props;

        return (
            <Navigation>
                <Card className={classes.card}>
                    <CardContent>
                        <div>
                            <Typography className={classes.title} gutterBottom variant='h2' component='h2'>
                                Registrer varsel
                            </Typography>
                        </div>
                        <Divider/>

                        <Step number={1} step={'Kategori'} description={'Velg den kategorien som passer best.'}/>
                        <div className={classes.right}>
                            <CategoryStep
                                categoryCallback={(e) => this.setCategory(e)}
                            />
                        </div>
                        <Divider/>

                        <Step number={2} step={'Posisjon'} description={'Sett en markør der det gjelder.'}/>
                        <div className={classes.right}>
                            <MapStep
                                location={this.state.location}
                                mapMarkerCallback={(e) => this.mapClickCallback(e)}
                            />
                        </div>
                        <Divider/>

                        <Step number={3} step={'Beskrivelse'} description={'Lag en kort beskrivelse for problemet.'}/>
                        <div className={classes.right}>
                            <DescriptionStep
                                setDescriptionCallback={(e) => this.setDescription(e)}
                            />
                        </div>
                        <Divider/>

                        <Step number={4} step={'Bilde'}
                              description={'Last opp eventuelle bilder som beskriver problemet.'}/>
                        <div className={classes.right}>
                            <PictureStep
                                images={this.state.images}
                                onImageChangeCallback={(event) => this.onImageChange(event)}
                                handleClickDeleteCallback={(index) => this.handleClickDelete(index)}
                            />

                        </div>
                        <Divider/>

                        <div>
                            <Button variant="contained" size={'large'} ize color='primary'
                                    className={classes.registerButton}
                                    onClick={() => this.openConfirmDialog()}
                            >
                                Send inn
                            </Button>
                            <ConfirmDialog open={this.state.confirmDialogOpen} closeConfirmDialogCallback={() => this.closeConfirmDialog()}/>
                        </div>

                    </CardContent>
                </Card>
            </Navigation>
        )
    }
}

export default withStyles(styles)(CreateWarning);