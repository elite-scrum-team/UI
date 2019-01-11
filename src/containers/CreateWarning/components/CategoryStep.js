import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {useState} from 'react';


// Material UI components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "../../../../node_modules/@material-ui/core/ListItemIcon/ListItemIcon";
import FolderIcon from "../../../../node_modules/@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";


// Icons

// Project components

const styles = makeStyles({
    root: {}
});

function generate(element) {

    return [0, 1, 2].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}


const CategoryStep = (props) => {
    // State
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(null);

    // Styling
    const classes = styles();

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const changeCategoryCallback = (category) => {
        let element = document.getElementById('categoryButton');
        element.innerHTML = category;
    }

    return (
        <div className={classes.root}>
            <Button id={'categoryButton'} variant="outlined" className={classes.button} onClick={handleOpen}>
                Velg
            </Button>
            <Dialog onClose={handleClose}
                    aria-labelledby='customized-dialog-title'
                    open={open}>
                <CategoryList
                    categoryCallback={(e) => props.categoryCallback(e)}
                    changeCategoryCallback={(e) => changeCategoryCallback(e)}
                    handleCloseCallback={() => handleClose()}
                />
            </Dialog>
        </div>
    )
}

const CategoryList = (props) => {
    // State
    const [open, setData] = useState({});

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <List>
                    {[0,1,2].map(value =>
                        <CategoryItem
                            key={('itemKey' + value)}
                            value={value}
                            categoryCallback={(e) => props.categoryCallback(e)}
                            changeCategoryCallback={(e) => props.changeCategoryCallback(e)}
                            handleCloseCallback={() => props.handleCloseCallback()}
                        />
                    )}
                </List>
            </Card>
        </div>
    )
}

const CategoryItem = (props) => {
    // State
    const [open, setOpen] = useState(false);

    // Styling
    const classes = styles();

    const setCategoryClick = (data) => {
        props.categoryCallback(data);
        props.changeCategoryCallback(data);
        props.handleCloseCallback();
    }

    return (
        <div className={classes.root}>
            <ListItem button onClick={() => setCategoryClick('item ' + (props.value+1))}>
                <ListItemIcon>
                    <FolderIcon/>
                </ListItemIcon>
                <ListItemText
                    primary={'item ' + (props.value+1)}
                />
            </ListItem>
        </div>
    )
}


export default (CategoryStep);