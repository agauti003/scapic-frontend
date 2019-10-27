import 'babel-polyfill';
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';

const App = lazy(() => import('../components/App'));


const Root = ({ store }) => (
    <Provider store={store}>
        <Suspense fallback={<div />}>
            <Router basename="/">
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={() =>
                            (<ErrorBoundary>
                                <App />
                            </ErrorBoundary>)}
                    />
                </Switch>
            </Router>
        </Suspense>
    </Provider>
);
Root.propTypes = {
    store: PropTypes.object.isRequired
};
export default Root;
