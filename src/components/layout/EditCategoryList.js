import React from 'react';
import { makeStyles } from '@material-ui/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "../../../node_modules/@material-ui/core/ListItemIcon/ListItemIcon";
import FolderIcon from "../../../node_modules/@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";

// Material UI components

// Icons

// Project components

const styles = makeStyles({
    root: {},
    list: {
        paddingBottom: 20,
    }
});

const EditCategoryList = (props) => {
    // State
    const classes = styles();
    let categories = props.categories || [];
    if (!(categories instanceof Array)) {
        categories = [];
    }

    return (
        <div>
            <List className={classes.list}>
                {categories.map(value =>
                    <CategoryItem
                        key={value.id}
                        value={value}
                        newCategory={props.newCategory}
                        newCategoryClick={props.newCategoryClick}
                    />
                )}
            </List>
        </div>
    )
};

export default (EditCategoryList);



const CategoryItem = (props) => {


    const setCategoryClick = (data) => {
        props.newCategoryClick(data);
        console.log(props.newCategory);
    };

    return (
        <div>
            <ListItem selected={props.value === props.newCategory} button onClick={() => setCategoryClick(props.value)}>
                <ListItemIcon>
                    <FolderIcon/>
                </ListItemIcon>
                <ListItemText
                    primary={props.value.name}
                />
            </ListItem>
        </div>
    )
};