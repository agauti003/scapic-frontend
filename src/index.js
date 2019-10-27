import React from 'react';
import ReactDOM from 'react-dom';
import Root from './routes/Root';
// import App from './Components/App'
import { HashRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';

ReactDOM.render(
    <Router basename="/">
        <Root store={configureStore} />
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
