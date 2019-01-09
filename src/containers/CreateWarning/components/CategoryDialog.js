import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';


// Material UI Components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "../../../../node_modules/@material-ui/core/ListItemIcon/ListItemIcon";
import FolderIcon from "../../../../node_modules/@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";


// Icons

// Project Components

const styles = makeStyles({
    root: {

    }
});

function generate(element) {
    return [0, 1, 2].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const TemplateComponent = (props) => {
    // State
    const [open, setData] = useState({});

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <List>
                    {generate(
                        <ListItem
                            button
                        >
                            <ListItemIcon>
                                <FolderIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary='item'
                            />
                        </ListItem>
                    )}
                </List>
            </Card>
        </div>
    )
}

export default (TemplateComponent);