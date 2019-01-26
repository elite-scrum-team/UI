import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Service imports
import EventService from '../../api/services/EventService';
import GeoService from '../../api/services/GeoService';

// Material UI components
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

// Icons

// Project components
import Navigation from "../../components/navigation/Navigation";
import Step from '../../components/layout/Step';
import Button from "@material-ui/core/Button";
import DescriptionStep from "../../components/layout/InputStep";
import MapStep from "../../components/layout/MapStep";
import SinglePictureStep from "./components/SinglePictureStep";
import DurationStep from "./components/DurationStep";
import URLS from "../../URLS";
import ConfirmDialog from "./components/ConfirmDialog";
import ConfirmEditDialog from "./components/ConfirmEditDialog";

const styles = {
    root: {},
    card: {
        maxWidth: 800,
        '@media only screen and (min-width: 601px)': {
            margin: '100px auto 50px auto',
        },

        '@media only screen and (max-width: 600px)': {
            marginTop: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
        },

    },
    content: {
        paddingTop: 20,
    },
    title: {
        textAlign: 'center',
        marginTop: '30px',
        marginBottom: '30px',
        fontWeight: '4',
    },
    registerButton: {
        margin: 'auto',
        display: 'block',
        marginTop: '30px',
        marginBottom: '10px',
    },
    bottom: {
        paddingBottom: 30,
    },
    right: {
        marginLeft: '50px',
        marginBottom: '20px',
    },
    mapRight: {
        '@media only screen and (max-width: 600px)': {
            marginTop: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
        },
        '@media only screen and (min-width: 601px)': {
            marginLeft: '50px',
            marginBottom: '20px',
        },
    },
};

let d = new Date();
let date = d.getFullYear() + '-' +
    ('0' + d.getMonth() + 1).slice(-2) + '-' +
    ('0' + d.getDate()).slice(-2) + 'T' +
    ('0' + d.getHours()).slice(-2) + ':' +
    ('0' + d.getMinutes()).slice(-2);

class CreateNews extends Component {

    state = {
        isLoading: false,
        editExisting: false,

        currentLocation: {
            lat: 63.428322,
            lng: 10.392774,
        },

        // User created data
        id: null,
        title: '',
        description: '',
        link: '',
        location: null,
        fromDate: date,
        toDate: date,
        image: [],
        imageFile: [],
    };

    setTitle = (data) => {
        this.setState({title: data});
        console.log(this.state);
    };

    setDescription = (data) => {
        this.setState({description: data});
    };

    setLink = (data) => {
        this.setState({link: data});
    };

    mapClickCallback = (data) => {
        this.setState({location: data});
    };

    onImageChange = (event) => {

        // Function for reading and adding an image
        const readImage = (file) => {
            let reader = new FileReader();
            reader.onload = (e) => {
                const images = Object.assign([], this.state.image);
                images.push(e.target.result);

                const imageFiles = Object.assign([], this.state.imageFile);
                imageFiles.push(file);

                this.setState({image: images, imageFile: imageFiles});
            };

            reader.readAsDataURL(file);
        };

        if (event.target.files && event.target.files[0]) {
            this.setState({image: [], imageFile: []});
            [].forEach.call(event.target.files, readImage);
        }

        console.log(this.state.image);
        console.log(this.state.imageFile);
    };

    handleClickDelete = () => {
        this.setState({image: [], imageFile: []});
    };

    setStartDate = (data) => {
        this.setState({fromDate: data});
    };

    setEndDate = (data) => {
        this.setState({toDate: data});
    };

    handleToggle = (name) => (event) => {
        this.setState({[name]: !this.state[name]});
    };

    createNews = () => {
        // Do nothing if already loading
        if (this.state.isLoading) {
            return;
        }

        // News object to send
        const news = {
            title: this.state.title,
            description: this.state.description,
            link: this.state.link,
            location: this.state.location,
            fromTime: this.state.fromDate,
            toTime: this.state.toDate,
            image: this.state.imageFile,
        };

        this.setState({isSending: true});
        console.log(news);
        EventService.createEvent(news, (isError, data) => {
            console.log(data);
            if (isError) {
                this.setState({isError: true, isSending: false, confirmDialogOpen: false});
            } else {
                this.props.history.push(URLS.events);
            }
        });
    };

    editNews = () => {
        // Do nothing if already loading
        if (this.state.isLoading) {
            return;
        }

        // News object to send
        const news = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            link: this.state.link,
            location: this.state.location,
            fromTime: this.state.fromDate,
            toTime: this.state.toDate,
            image: this.state.imageFile,
        };

        this.setState({isSending: true});
        console.log(news);
        EventService.updateEvent(news, (isError, data) => {
            console.log(data);
            if (isError) {
                this.setState({isError: true, isSending: false, confirmDialogOpen: false});
            } else {
                this.setState({isSending: false});
                this.props.history.push(URLS.events);
            }
        });

    };


    getNewsId = () => this.props.match.params.id;

    componentDidMount() {
        console.log(this.getNewsId());
        const id = this.getNewsId();
        if (this.getNewsId()) {
            console.log(id);
            EventService.getEvent(id, async (isError, e) => {
                if (isError === false) {
                    await this.setState({
                        id: e.id,
                        title: e.title,
                        description: e.description,
                        link: e.link,
                        location: {
                            lat: e.location.coordinate.coordinates[0],
                            lng: e.location.coordinate.coordinates[1]
                        },
                        currentLocation: {
                            lat: e.location.coordinate.coordinates[0],
                            lng: e.location.coordinate.coordinates[1]
                        },
                    });
                    if (e.fromTime !== null && e.toTime !== null) {
                        await this.setState({
                            fromDate: e.fromTime.slice(0, 16),
                            toDate: e.toTime.slice(0, 16),
                        });
                    }
                    if (e.images[0]) {
                        await this.setState({
                            image: [e.images[0].fileURL],
                        });
                    }
                    console.log(e);
                    this.setState({isLoading: false, editExisting: true});
                }
            });
        }
        else {
            // Ask for current location
            GeoService.getGeoLocation((e) => {
                console.log(e);
                this.setState({currentLocation: {lat: e.coords.latitude, lng: e.coords.longitude}})
            });
        }
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
                                    {!this.getNewsId() ? 'Meld inn arrangement' : 'Rediger arrangement'}
                                </Typography>
                            </div>
                            <Divider/>

                            <Step number={1} step={'Tittel'}
                                  description={'Velg en tittel for hendelsen.'}/>
                            <div className={classes.right}>
                                <DescriptionStep
                                    existingInput={this.state.title} setInputCallback={(e) => this.setTitle(e)}
                                    stepName={'Tittel'} rows={1}
                                />
                            </div>
                            <Divider/>

                            <Step number={2} step={'Beskrivelse'}
                                  description={'Beskriv hendelsen kort og godt.'}/>
                            <div className={classes.right}>
                                <DescriptionStep
                                    existingInput={this.state.description}
                                    setInputCallback={(e) => this.setDescription(e)} stepName={'Beskrivelse'} rows={3}
                                />
                            </div>
                            <Divider/>

                            <Step number={3} step={'Link'}
                                  description={'Gi en link til hendelsens offisielle hjemmeside.'}/>
                            <div className={classes.right}>
                                <DescriptionStep
                                    existingInput={this.state.link} setInputCallback={(e) => this.setLink(e)}
                                    stepName={'Link'} rows={1}
                                />
                            </div>
                            <Divider/>

                            <Step number={4} step={'Posisjon'}
                                  description={'Velg hvor hendelsen foregår.'}/>
                            <div className={classes.mapRight}>
                                <MapStep
                                    editExisting={this.state.editExisting}
                                    defaultLocation={this.state.currentLocation}
                                    selectedLocation={this.state.location}
                                    location={this.state.location === null ? this.state.currentLocation : this.state.location}
                                    mapMarkerCallback={(e) => this.mapClickCallback(e)}
                                />
                            </div>
                            <Divider/>

                            <Step number={5} step={'Periode'}
                                  description={'Velg tidsrommet hendelsen foregår.'}/>
                            <div className={classes.right}>
                                <DurationStep
                                    currentDate={date}
                                    startTime={this.state.fromDate}
                                    endTime={this.state.toDate}
                                    printShit={() => this.printShit()}
                                    setStartTimeCallback={(e) => this.setStartDate(e)}
                                    setEndTimeCallback={(e) => this.setEndDate(e)}
                                />
                            </div>
                            <Divider/>

                            <Step number={6} step={'Bilde'}
                                  description={'Velg et bilde for hendelsen.'}/>
                            <div className={classes.right}>
                                <SinglePictureStep
                                    image={this.state.image}
                                    onImageChangeCallback={(event) => this.onImageChange(event)}
                                    handleClickDeleteCallback={() => this.handleClickDelete()}

                                />
                            </div>
                            <Divider/>

                            <div className={classes.bottom}>
                                <Button variant="contained" size={'large'} color='primary'
                                        className={classes.registerButton}
                                        onClick={this.handleToggle('confirmDialogOpen')}
                                        disabled={!this.state.title || !this.state.description || !this.state.location}>
                                    {!this.state.editExisting ? 'Send inn' : 'Rediger arrangement'}
                                </Button>

                                {!this.state.editExisting ?
                                    <ConfirmDialog
                                        open={this.state.confirmDialogOpen}
                                        onSubmit={() => this.createNews()}
                                        isLoading={this.state.isSending}
                                        closeConfirmDialogCallback={this.handleToggle('confirmDialogOpen')}/>
                                    :
                                    <ConfirmEditDialog
                                        open={this.state.confirmDialogOpen}
                                        onSubmit={() => this.editNews()}
                                        isLoading={this.state.isSending}
                                        closeConfirmDialogCallback={this.handleToggle('confirmDialogOpen')}/>
                                }


                            </div>
                        </div>
                    </Paper>
                }
            </Navigation>
        )
    }
}


export default withStyles(styles)(CreateNews);