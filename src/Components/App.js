import React, { Component } from 'react';
import Shipments from './Shipments';
import Cargo from './Cargo';
import './App.css';

import { Route, Redirect, Switch } from 'react-router-dom';

export default class App extends Component {
    render () {
        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/shipment" />} />
                <Route path="/shipment/:id" exact render={() => <Cargo {...this.state} />} />
                <Route path="/shipment" exact render={() => <Shipments {...this.state} />} />
            </Switch>
        );
    }
}
