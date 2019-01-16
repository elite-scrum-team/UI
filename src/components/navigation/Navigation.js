import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import URLS from '../../URLS';

// Service imports
import AuthService from '../../api/services/AuthService';

// Material UI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

// Assets/Icons
import Add from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";


// Project components

const styles = {
    appbar: {
        height: 48,
    },
    main: {
        marginTop: 48,
    },
    leftMargin: {
      
      right: 'auto',
    },
    navContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logInButton: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
    },
    warningButton: {
        marginLeft: 24,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallIcon: {
        height: 16,
        width: 16,
    },
    SVGLogo: {
        fill: '#fff',
        height: '100%',
        width: '100%',
    },
    logoClicker:{
        alignItems: 'left',
        height: 50,
        width: 50
    }
};


class Navigation extends Component {

    goTo = (page) => {
        this.props.history.push(page);
    };

    logOut = () => {
        AuthService.logOut();
        this.props.history.push(URLS.home);
    };

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <AppBar className={classNames(classes.appbar, this.props.sidebar ? classes.leftMargin : '')} position='fixed' color='primary'>
                    <Toolbar className={classes.navContent} variant='dense'>
                        <div className={classes.logoClicker} >
                            <IconButton onClick={()=>this.goTo(URLS.home)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox='10 10 80 80'
                                    height='100%'
                                    width='100%'
                                    className={classes.SVGLogo}>
                                    <path
                                        id="path4138"
                                        d="M39.2250977,43.375v-8.0673828h5.9736328c0.394043,0,0.7514648-0.2314453,0.9125977-0.5908203  c0.1611328-0.3598633,0.0961914-0.7802734-0.1660156-1.074707L33.1958008,19.3344727  c-0.3798828-0.4257812-1.1132812-0.4257812-1.4931641,0L18.953125,33.6420898  c-0.262207,0.2944336-0.3271484,0.7148438-0.1660156,1.074707c0.1611328,0.359375,0.5185547,0.5908203,0.9125977,0.5908203H25.625  V43.375c0,0.5522461,0.4477539,1,1,1h11.6000977C38.7773438,44.375,39.2250977,43.9272461,39.2250977,43.375z   M37.2250977,34.3076172V42.375H27.625v-8.0673828c0-0.5522461-0.4477539-1-1-1h-4.6948242l10.519043-11.8046875  l10.519043,11.8046875h-4.7431641C37.6728516,33.3076172,37.2250977,33.7553711,37.2250977,34.3076172z"
                                    /><path
                                        id="path4140"
                                        d="M61.1748047,32.9135742c-2.1256714,0-4.2356567,0.2436523-6.2924194,0.6973877  c0.3830566-6.0664673-1.7466431-12.2507324-6.4204712-16.9615479c-8.671875-8.7382812-22.9101562-8.8657227-31.7402344-0.2817383  c-4.2807617,4.1621094-6.6674805,9.7260742-6.7207031,15.6669922c-0.0532227,5.9389648,2.2324219,11.5429688,6.4360352,15.7797852  c4.4345093,4.4681396,10.3956299,6.7941284,16.494751,6.6522217c-1.0994263,4.8543701-0.4584351,9.7312012-0.432251,9.9185791  c0.3208008,3.1191406,1.5244141,7.168457,3.0712891,10.3388672c1.3530273,4.5253906-7.1210938,7.925293-7.2075195,7.9589844  c-0.3076172,0.121582-0.5356445,0.3867188-0.6088867,0.7094727c-0.0727539,0.3222656,0.0175781,0.6601562,0.2426758,0.9018555  c6.105957,6.5678711,14.4404297,2.0727539,16.7470703,0.6181641C49.5805664,88.2431641,55.2460938,90,61.1748047,90  C77.0688477,90,90,77.1958008,90,61.4570312S77.0688477,32.9135742,61.1748047,32.9135742z M17.8569336,46.4052734  c-3.824707-3.8540039-5.9047852-8.9516602-5.8564453-14.3530273c0.0488281-5.402832,2.2207031-10.4638672,6.1157227-14.2509766  c8.046875-7.8217773,21.0224609-7.7070312,28.9257812,0.2568359c7.8017578,7.8632812,7.8725586,20.2426758,0.1606445,28.1835938  c-0.1367188,0.140625-0.2763672,0.2807617-0.418457,0.418457c-0.0263672,0.0258789-0.0517578,0.0527344-0.0751953,0.081543  c-1.1889648,1.4375-1.203125,2.7270508-1.0058594,3.5556641c0.2924805,1.2260742,1.1884766,2.1801758,2.0507812,2.8452148  c-5.0581055,1.5546875-7.859375-1.2578125-7.9853516-1.3876953c-0.1918945-0.2036133-0.456543-0.3139648-0.7275391-0.3139648  c-0.1015625,0-0.2041016,0.015625-0.3037109,0.0473633C31.3168945,53.8540039,23.3164062,51.90625,17.8569336,46.4052734z   M61.1748047,88c-5.7387695,0-11.2119141-1.7670898-15.8271484-5.1098633  c-0.3520508-0.2548828-0.8310547-0.2529297-1.1821289,0.0068359c-0.0825195,0.0605469-7.8217773,5.6894531-13.6591797,1.0097656  c2.7822266-1.3789062,8.5317383-4.9013672,6.9492188-9.8569336c-0.0151367-0.046875-0.0332031-0.0927734-0.0551758-0.1367188  c-1.4672852-2.9858398-2.6103516-6.8061523-2.9155273-9.7646484c-0.0067139-0.0518799-0.6708374-5.1633911,0.5462646-9.8361206  c1.2590332-0.1468506,2.5172119-0.3873901,3.7623291-0.7503052c0.8793945,0.7177734,2.9331055,2.0581055,6.003418,2.0581055  c1.6064453,0,3.4916992-0.3676758,5.6318359-1.3833008c0.3535156-0.1674805,0.5756836-0.5263672,0.5703125-0.9174805  s-0.2392578-0.7436523-0.597168-0.9013672c-0.6650391-0.2939453-2.4570312-1.331543-2.7539062-2.5878906  c-0.1313477-0.5566406,0.0546875-1.137207,0.5693359-1.7734375c0.1425781-0.1391602,0.2832031-0.2802734,0.4204102-0.421875  c3.3233643-3.4221191,5.3123779-7.5960083,6.0100708-11.9246216c2.1231079-0.5250244,4.3167725-0.7965698,6.5270386-0.7965698  C75.9663086,34.9135742,88,46.8208008,88,61.4570312C88,76.0927734,75.9663086,88,61.1748047,88z"
                                    /><path
                                        id="path4142"
                                        d="M71.1157227,56.7075195h-18c-0.5522461,0-1,0.4477539-1,1s0.4477539,1,1,1h18c0.5522461,0,1-0.4477539,1-1  S71.6679688,56.7075195,71.1157227,56.7075195z"
                                    /><path
                                        id="path4144"
                                        d="M71.1157227,66.2719727h-18c-0.5522461,0-1,0.4477539-1,1s0.4477539,1,1,1h18c0.5522461,0,1-0.4477539,1-1  S71.6679688,66.2719727,71.1157227,66.2719727z"
                                    />
                                </svg>
                            </IconButton>
                        </div>
                        <div className={classes.flex}>

                            <div>
                                {AuthService.isAuthenticated()?
                                <Button
                                    className={classes.logInButton}
                                    size='small'
                                    onClick={this.logOut}>Logg ut</Button>
                                :
                                <Button
                                    className={classes.logInButton}
                                    size='small'
                                    onClick={() => this.goTo(URLS.login)}>Logg inn</Button>
                                }
                                
                            </div>
                            <div>
                                <Button
                                    className={classes.warningButton}
                                    size='small'
                                    variant='outlined'
                                    color='secondary'
                                    onClick={() => this.goTo(URLS.createwarning)}>Ny varsel <Add /></Button>
                            </div>
                        </div>
                        
                    </Toolbar>
                </AppBar>
                
                <main className={classNames(classes.main)}>
                    {(this.props.isLoading)? <LinearProgress /> : null}
                    <div>
                        {this.props.children}
                    </div>
                </main>
            </Fragment>
          );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object,
    children: PropTypes.node,
    isLoading: PropTypes.bool,
};

export default withStyles(styles)(withRouter(Navigation));
