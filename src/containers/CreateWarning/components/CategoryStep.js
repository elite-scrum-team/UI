import React from 'react';
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
import Typography from '@material-ui/core/Typography';


// Icons

// Project components

const styles = makeStyles({
    root: {
        padding: '18px 0',
        position: 'relative',
    },
    titleWrapper: {
        position: 'sticky',
        top: 0,
        padding: 12,
        backgroundColor: 'white',
        zIndex: 2,
    }
});


const CategoryStep = (props) => {
    // State
    const [open, setOpen] = useState(false);

    const categories = props.categories || [];

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
        element.innerHTML = category.name;
    }

    return (
        <div className={classes.root}>
            <Button id={'categoryButton'} variant="outlined" className={classes.button} onClick={handleOpen}>
                Velg
            </Button>
            <Dialog onClose={handleClose}
                    aria-labelledby='customized-dialog-title'
                    open={open}>
                <div className={classes.titleWrapper}>
                    <Typography variant='h6'>Velg en kategori</Typography>
                </div>
                <CategoryList
                    categories={categories}
                    categoryCallback={(e) => props.categoryCallback(e)}
                    changeCategoryCallback={(e) => changeCategoryCallback(e)}
                    handleCloseCallback={() => handleClose()}
                />
            </Dialog>
        </div>
    )
}

const CategoryList = (props) => {

    // Styling
    const classes = styles();
    let categories = props.categories || [];
    if(!(categories instanceof Array)) {
        categories = [];
    }
    
    return (
        <div>
            <Card className={classes.card}>
                <List>
                    {categories.map(value =>
                        <CategoryItem
                            key={value.id}
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


    const setCategoryClick = (data) => {
        props.categoryCallback(data);
        props.changeCategoryCallback(data);
        props.handleCloseCallback();
    }

    return (
        <div>
            <ListItem button onClick={() => setCategoryClick(props.value)}>
                <ListItemIcon>
                    <FolderIcon/>
                </ListItemIcon>
                <ListItemText
                    primary={props.value.name}
                />
            </ListItem>
        </div>
    )
}


export default (CategoryStep);