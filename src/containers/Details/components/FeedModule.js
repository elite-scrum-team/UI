import React  from 'react';
import { makeStyles } from '@material-ui/styles';
// Material UI components

// Icons

// Project components
import CommentBox from "./CommentBox";
import StatusBox from "./StatusBox";
import PropTypes from "prop-types";
import CommentSection from "./CommentSection";


const styles = makeStyles({
    root: {
        
    },
});

const FeedModule = (props) => {

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <CommentBox id={props.id}/>
            {(props.items !== null)?(props.items.map((item, index) => {
                    if(item.type === 'status') {
                        return (
                            <StatusBox
                                date={item.data.date}
                                province={item.data.province}
                                status={item.data.status}
                                statusMessage={item.data.statusMessage}
                                statustekst={item.data.statustekst}
                            />
                        )
                    } else if(item.type === 'comment') {
                        return (
                            <CommentSection
                                username={item.data.username}
                                breadtext={item.data.breadtext}
                                commentDate={item.data.commentDate}
                            />
                        )
                    } else {
                        return null;
                    }
                })) : null}
        </div>
    )
};

FeedModule.propTypes = {
    id: PropTypes.string,
    items: PropTypes.array,
};

export default (FeedModule);