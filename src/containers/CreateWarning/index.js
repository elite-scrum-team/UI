import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import URLS from '../../URLS';

// Service imports
import CategoryService from '../../api/services/CategoryService';
import WarningService from '../../api/services/WarningService';
import GeoService from '../../api/services/GeoService';

// Material UI components
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// Icons

//Project components
import Navigation from '../../components/navigation/Navigation';
import Step from '../../components/layout/Step';
import CategoryStep from './components/CategoryStep';
import MapStep from '../../components/layout/MapStep';
import DescriptionStep from '../../components/layout/InputStep';
import PictureStep from './components/PictureStep';
import ConfirmDialog from './components/ConfirmDialog';
import MessageDialog from '../../components/miscellaneous/MessageDialog';


const styles = {
    root: {},
    card: {
        maxWidth: 800,
        margin: '100px auto 50px auto',

        '@media only screen and (max-width: 600px)': {
            marginTop: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
        }

    },
    content: {
        paddingTop: 20,
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
    fillSection: {
        marginLeft: '50px',
        marginBottom: '20px',

        '@media only screen and (max-width: 600px)': {
            marginLeft: 0,
        }
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
        },
    bottom: {
        paddingBottom: 30,
    }
};


class CreateWarning extends Component {

    state = {
        isLoading: true,
        isSending: false,
        open: false,
        isError: false,
        confirmDialogOpen: false,
        currentLocation: {
            lat: 63.428322,
            lng: 10.392774,
        },

        // Data
        categories: [], // id and name
        
        // User created data
        images: [],
        imageFiles: [],
        category: null,
        description: '',
        location: null,
    };

    componentDidMount() {

        // Get all categories
        CategoryService.getCategories((isError, data) => {
            console.log(data);
            if(isError) {
                console.log("Error fetching categories");
            } else {
                this.setState({categories: data});
                for (let i = 0; i < this.state.categories.length; i++){
                    console.log(this.state.categories[i]);
                    if (this.state.categories[i].name === 'Andre skader/mangler'){
                        console.log('greting');
                        this.setState({category: this.state.categories[i]});
                    }
                }
            }
            this.setState({isLoading: false});
        });

        // Ask for current location
        GeoService.getGeoLocation((e) =>
            this.setState({currentLocation: {lat: e.coords.latitude, lng: e.coords.longitude}})
        );
    }

    sendWarning = () => {
        // Do nothing if already loading
        if(this.state.isLoading) {
            return;
        }

        // Warning object to send
        const warning = {
            description: this.state.description,
            location: this.state.location,
            categoryId: this.state.category.id,
            images: this.state.imageFiles,
        };

        this.setState({isSending: true});
        WarningService.createWarning(warning, (isError, data) => {
            console.log(data);
            if(isError) {
                this.setState({isError: true, isSending: false, confirmDialogOpen: false});
            } else {
                this.props.history.push(URLS.details.concat(data.id));
            }
        });
    };

    handleToggle = (name) => () => {
        this.setState({[name]: !this.state[name]});
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

    onImageChange = (event) => {
        
        // Function for reading and adding an image
        const readImage = (file) => {
            let reader = new FileReader();
            reader.onload = (e) => {
                const images = Object.assign([], this.state.images);
                images.push(e.target.result);

                const imageFiles = Object.assign([], this.state.imageFiles);
                imageFiles.push(file);

                this.setState({images: images, imageFiles: imageFiles});
            };

            reader.readAsDataURL(file);
        };

        // Read images
        if (event.target.files && event.target.files[0]) {
            [].forEach.call(event.target.files, readImage)
        }

        console.log(this.state.images);
        console.log(this.state.imageFiles);
    };

    setCategory = (data) => {
        this.setState({category: data})
    };

    mapClickCallback = (data) => {
        this.setState({location: data});
    };

    setDescription = (data) => {
        this.setState({description: data});
        console.log(this.state.description);
    };

    canSendWarning = () => {
        return this.state.category !== null && this.state.location !== null && this.state.description.length > 2;
    };

    render() {
        const {classes} = this.props;

        return (
            <Navigation isLoading={this.state.isLoading}>
                {this.state.isLoading ? null :
                    <Paper className={classes.card}>
                        <div className={classes.content}>
                            <div>
                                <Typography className={classes.title} gutterBottom variant='h2' component='h2'>
                                    Registrer varsel
                                </Typography>
                            </div>
                            <Divider/>

                            <Step number={1} step={'Beskrivelse'} description={'Lag en kort beskrivelse for problemet.'}/>
                            <div className={classes.right}>
                                <DescriptionStep
                                    setInputCallback={(e) => this.setDescription(e)} stepName={'Beskrivelse'} rows={3}
                                />
                            </div>
                            <Divider/>



                            <Step number={2} step={'Posisjon'} description={'Sett en markør der det gjelder.'}/>
                            <div className={classes.fillSection}>
                                <MapStep
                                    defaultLocation={this.state.currentLocation}
                                    mapMarkerCallback={(e) => this.mapClickCallback(e)}
                                />
                            </div>
                            <Divider/>

                            <Step number={3} step={'Bilde'}
                                description={'Last opp eventuelle bilder som beskriver problemet.'}/>
                            <div className={classes.fillSection}>
                                <PictureStep
                                    images={this.state.images}
                                    onImageChangeCallback={(event) => this.onImageChange(event)}
                                    handleClickDeleteCallback={(index) => this.handleClickDelete(index)}
                                />

                            </div>
                            <Divider/>

                            <Step number={4} step={'Kategori'} description={'Velg den kategorien som passer best.'}/>
                            <div className={classes.right}>
                                <CategoryStep
                                    category={this.state.category}
                                    categories={this.state.categories}
                                    categoryCallback={(e) => this.setCategory(e)}
                                />
                            </div>
                            <Divider/>

                            <div className={classes.bottom}>
                                <Button variant="contained" size={'large'} color='primary'
                                    className={classes.registerButton}
                                    onClick={this.handleToggle('confirmDialogOpen')}
                                    disabled={!this.canSendWarning()}
                                >
                                    Send inn
                                </Button>
                                <ConfirmDialog
                                    open={this.state.confirmDialogOpen}
                                    onSubmit={this.sendWarning}
                                    isLoading={this.state.isSending}
                                    closeConfirmDialogCallback={this.handleToggle('confirmDialogOpen')}/>
                            </div>

                        </div>
                    </Paper>
                }
                <MessageDialog
                    open={this.state.isError}
                    onClose={this.handleToggle('isError')}
                    title={'Det oppstod en feil'}
                    content='Kunne ikke sende varselen til kommunen'
                    error={true}/>
            </Navigation>
        )
    }
}

export default withStyles(styles)(CreateWarning);