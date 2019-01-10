import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
// Material UI components

// Icons

// Project components
import CommentBox from "./CommentBox";


const styles = makeStyles({
    root: {
        
    },

});

const FeedModule = (props) => {
    // State
    const [file, setFile] = useState(null);

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <CommentBox/>
        </div>
    )
}

FeedModule.propTypes = {
    
}

export default (FeedModule);