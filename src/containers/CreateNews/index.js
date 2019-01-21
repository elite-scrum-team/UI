import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

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
let date =  d.getFullYear() + '-' +
            ('0' + d.getMonth()+1).slice(-2) + '-' +
            ('0' + d.getDate()).slice(-2) + 'T' +
            ('0' + d.getHours()).slice(-2) + ':' +
            ('0' + d.getMinutes()).slice(-2);

class CreateNews extends Component {

    state = {
        isLoading: false,
        currentLocation: {
            lat: 63.428322,
            lng: 10.392774,
        },

        // User created data
        title: '',
        description: '',
        link: '',
        location: null,
        fromDate: date,
        toDate: date,
        image: null,
        imageFile: null,
    };

    setTitle = (data) => {
        this.setState({title: data});
        console.log(this.state.title);

    };

    setDescription = (data) => {
        this.setState({description: data});
        console.log(this.state.description);
    };

    setLink = (data) => {
        this.setState({link: data});
        console.log(this.state.link);

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
            this.setState({image: null, imageFile: null});
            [].forEach.call(event.target.files, readImage);
        }

        console.log(this.state.image);
        console.log(this.state.imageFile);
    };

    handleClickDelete = () => {
        this.setState({image: null, imageFile: null});
    };

    setStartDate = (data) => {
        this.setState({fromDate:  data});
        console.log(this.state.fromDate);
    };
    setEndDate = (data) => {
        this.setState({toDate:  data});
        console.log(this.state.toDate);

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
                                    Meld inn nyhet
                                </Typography>
                            </div>
                            <Divider/>

                            <Step number={1} step={'Tittel'}
                                  description={'Velg en tittel for hendelsen.'}/>
                            <div className={classes.right}>
                                <DescriptionStep
                                    setInputCallback={(e) => this.setTitle(e)} stepName={'Tittel'} rows={1}
                                />
                            </div>
                            <Divider/>

                            <Step number={2} step={'Beskrivelse'}
                                  description={'Beskriv hendelsen kort og godt.'}/>
                            <div className={classes.right}>
                                <DescriptionStep
                                    setInputCallback={(e) => this.setDescription(e)} stepName={'Beskrivelse'} rows={3}
                                />
                            </div>
                            <Divider/>

                            <Step number={3} step={'Link'}
                                  description={'Gi en link til hendelsens offisielle hjemmeside.'}/>
                            <div className={classes.right}>
                                <DescriptionStep
                                    setInputCallback={(e) => this.setLink(e)} stepName={'Link'} rows={1}
                                />
                            </div>
                            <Divider/>

                            <Step number={4} step={'Posisjon'}
                                  description={'Velg hvor hendelsen foregår.'}/>
                            <div className={classes.mapRight}>
                                <MapStep
                                    location={this.state.currentLocation}
                                    mapMarkerCallback={(e) => this.mapClickCallback(e)}
                                />
                            </div>
                            <Divider/>

                            <Step number={5} step={'Periode'}
                                  description={'Velg tidsrommet hendelsen foregår.'}/>
                            <div className={classes.right}>
                                <DurationStep
                                    currentDate={date}
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
                                >
                                    Send inn
                                </Button>
                            </div>
                        </div>
                    </Paper>
                }
            </Navigation>
        )
    }
}



export default withStyles(styles)(CreateNews);