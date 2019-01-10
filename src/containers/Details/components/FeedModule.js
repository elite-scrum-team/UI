import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
// Material UI components

// Icons

// Project components
import CommentBox from "./CommentBox";
import StatusBox from "./StatusBox";
import PropTypes from "prop-types";


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
                date={props.date}
                province={props.province}
                status={props.status}
                statusMessage={props.statusMessage}
                statustekst={props.statustekst}

            />
        </div>
    )
}

FeedModule.propTypes = {
    date: PropTypes.string,
    province: PropTypes.string,
    status: PropTypes.number,
    statusMessage: PropTypes.string,
    statustekst: PropTypes.string,
}

export default (FeedModule);