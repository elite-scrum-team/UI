import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import './assets/css/spacing.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import moment from 'moment';
require('moment/locale/nb.js');

// Required for setting up environment variables
require('dotenv').config();

// Moment JS Configuration
moment.locale('nb');

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
