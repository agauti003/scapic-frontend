import 'babel-polyfill';
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
const Login = lazy(() => import('../components/Login'));
const Register = lazy(() => import('../components/Register'));
const App = lazy(() => import('../components/Categories'));
const Logout = lazy(() => import('../components/Logout'));


const Root = ({ store }) => (
    <Provider store={store}>
        <Suspense fallback={<div />}>
            <Router basename="/">
                <Switch>
                    <Route
                        exact
                        path="/homepage"
                        component={() =>
                            (<ErrorBoundary>
                                <App />
                            </ErrorBoundary>)}
                    />
                    <Route
                        exact
                        path="/login"
                        component={() =>
                            (<ErrorBoundary>
                                <Login />
                            </ErrorBoundary>)}
                    />
                    <Route
                        exact
                        path="/logout"
                        component={() =>
                            (<ErrorBoundary>
                                <Logout />
                            </ErrorBoundary>)}
                    />
                    <Route
                        exact
                        path="/register"
                        component={() =>
                            (<ErrorBoundary>
                                <Register />
                            </ErrorBoundary>)}
                    />
                    <Route
                        exact
                        path="/"
                        component={() =>
                            (<ErrorBoundary>
                                <Redirect to={"login"} />
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
