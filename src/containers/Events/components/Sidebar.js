import React from 'react';
import { makeStyles } from '@material-ui/styles';

// Material UI components
import Drawer from '@material-ui/core/Drawer';

// Icons

// Project components
import DetailCard from './DetailCard';

const drawerWidth = 450;

const styles = makeStyles({
    root: {
        width: drawerWidth,
        borderRight: 'none',
        marginTop: 32,
    },

});

const Sidebar = props => {
    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <Drawer
                open={props.open}
                variant='persistent'
                classes={{
                    root: classes.cover,
                    paper: classes.root,
                }}
            >
                <DetailCard {...props} />
            </Drawer>
        </div>
    );
};

export default Sidebar;
