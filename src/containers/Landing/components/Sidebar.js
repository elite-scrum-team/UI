import React from 'react';
import { makeStyles } from '@material-ui/styles';

// Material UI components
import Drawer from '@material-ui/core/Drawer';

// Icons

// Project components
import SearchContent from './SearchContent';

const drawerWidth = 325;

const styles = makeStyles({
    root: {
        width: drawerWidth,
        borderRight: 'none',
    }
});

const Sidebar = (props) => {
    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <Drawer
                variant='permanent'
                classes= {{
                    paper: classes.root,
                }}>
                <SearchContent {...props} />
            </Drawer>
        </div>
    )
}

export default (Sidebar);