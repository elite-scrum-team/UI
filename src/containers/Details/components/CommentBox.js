import React, {Component}  from 'react';
import { withStyles } from '@material-ui/styles';

// Material UI components
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

// Icons

// Project components
import FileSelector from "./FileSelector";

const styles = {
    root: {
        padding: '22px',
        backgroundColor: 'red',
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
    }
};

class CommentBox extends Component {
    
    state = {
        file: null,
        image: null,
    }

    render() {
        const {classes} = this.props;
        return (
            <Paper className='p-30' square>
                <TextField
                    id="filled-multiline-static"
                    label="Skriv en kommentar..."
                    multiline
                    fullWidth
                    rows="2"
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                />
                {this.state.image && <img src={this.state.image} alt={'commentImage'} />}
                <div className={classes.clickables}>
                    <Button variant="contained" color="primary" className={classes.button}>
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