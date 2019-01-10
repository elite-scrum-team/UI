import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
// Material UI components

// Icons

// Project components
import CommentBox from "./CommentBox";
import StatusBox from "./StatusBox";


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
            <StatusBox
                province='Trondheim Kommune'
                status={3}
                statustekst='Work in Progress'
                statusMessage='Har sagt i fra til bedrift bla bla bla'
            />
        </div>
    )
}

FeedModule.propTypes = {
    
}

export default (FeedModule);