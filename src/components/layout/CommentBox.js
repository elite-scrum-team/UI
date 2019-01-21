import React, {Component}  from 'react';
import { withStyles } from '@material-ui/styles';

// Service imports
import WarningService from '../../api/services/WarningService';

// Material UI components
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

// Icons

// Project components
import FileSelector from "./FileSelector";

const styles = {
    root: {
        padding: 24,
    },
    clickables:{
        alignItems: 'center',
        display: 'flex',
        gridTemplateAreas: 'commentButton bookmark',
    },
    button:{
        gridArea: 'commentButton',
    },
    bookmark:{
        justifySelf: 'center',
        gridArea:'bookmark',
        padding: 10,
    },
    imageWrapper: {
        marginTop: 12,
        maxWidth: 200,
        height: 'auto',
        maxHeight: 300,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
    }
};

class CommentBox extends Component {
    
    state = {
        file: null,
        image: null,
        comment: '',
    }

    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
    }

    submitComment = () => {
        const comment = this.state.comment;
        const image = this.state.file;

        if(!comment || comment.length === 0) {
            return;
        }

        WarningService.createComment(this.props.id, comment, image, (isError, data) => {
            if(isError) {

            } else {
                this.setState({comment: null, file: null, image: null});
            }
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <TextField
                    id="filled-multiline-static"
                    label="Skriv en kommentar..."
                    multiline
                    fullWidth
                    rows="2"
                    className={classes.textField}
                    value={this.state.comment}
                    onChange={this.handleChange('comment')}
                    variant="filled"
                />
                {this.state.image && 
                <div className={classes.imageWrapper}>
                    <img className={classes.image} src={this.state.image} alt={'commentImage'} />
                </div>}
                <div className={classes.clickables}>
                    <Button
                        onClick={this.submitComment}
                        variant="contained"
                        color="primary"
                        className={classes.button}>
                        Kommenter
                    </Button>
                    <FileSelector onChange={(image, file) => {
                        this.setState({image, file});
                    }}/>
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(CommentBox);