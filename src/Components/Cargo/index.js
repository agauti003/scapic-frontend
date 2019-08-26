import React, { Component } from 'react';
import './index.css';

export default class index extends Component {
    constructor (props) {
        super(props);
        this.state = {
            shipment_id: location.hash.split("=")[1],
            shipmentDetails: {}
        };
    }

    componentDidMount () {
        fetch("http://localhost:3000/shipments")
            .then(resp => resp.json())
            .then(response => {
                let shipmentDetails = {};
                for (var i = 0; i < response.length; i++) {
                    if (response[i].id === this.state.shipment_id) {
                        shipmentDetails = { ...response[i] };
                        break;
                    }
                }
                this.setState({ shipmentDetails });
            });
    }

    render () {
        const { shipmentDetails } = this.state;
        return (
            <div className={""}>
                <header>
                    <div className="header-container">
                        <h3>Shipment</h3>
                    </div>
                </header>

                <div className={"body-container"}>
                    <div className={"cargo-container"}>
                        <div className={"shipment-contents"}>
                            <header>
                                <div className="">
                                    <h2>Shipment Details</h2>
                                </div>
                            </header>
                            <div className={"status details-container"}>{`Status: ${shipmentDetails.status}`}</div>
                            <div className={"name details-container"}>{`Name: ${shipmentDetails.name}`}</div>
                            <div className={"destination details-container"}>{`Destination: ${shipmentDetails.destination}`}</div>
                            <div className={"origin details-container"}>{`Origin: ${shipmentDetails.origin}`}</div>
                            <div className={"mode details-container"}>{`Shipment mode: ${shipmentDetails.mode}`}</div>
                            <div className={"type  details-container"}>{`Shipment type: ${shipmentDetails.type}`}</div>
                            <div className={"total details-container"}>{`Total: ${shipmentDetails.total}`}</div>
                        </div>
                        <div className={"cargo-contents"}>
                            {shipmentDetails.hasOwnProperty('cargo') &&
                                shipmentDetails.cargo.map((value, index) => {
                                    return (
                                        <div key={index} className={"cards cargo"}>
                                            <header>
                                                <div className="">
                                                    <h2>Cargo Details</h2>
                                                </div>
                                            </header>
                                            <div className={"contents"}>
                                                <div className={"description"}>
                                                    {`Description: ${value.description}`}
                                                </div>
                                                <div className={"type"}>
                                                    {`Type: ${value.type}`}
                                                </div>
                                                <div className={"Volume"}>
                                                    {`Volume: ${value.volume}`}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
