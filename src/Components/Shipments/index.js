/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class Shipments extends Component {
    constructor (props) {
        super(props);
        this.state = {
            table: {
                lastFilterData: [],
                lastPage: 1,
                tableData: [],
                totalTableData: [],
                currPage: 1,
                pageSize: 0,
                filterText: ''
            }

        };
        this.handleOnSearch = this.handleOnSearch.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    componentDidMount () {
        fetch("http://localhost:3000/shipments")
            .then(resp => resp.json())
            .then(response => {
                const start = 0;
                const end = 20;
                const table = { ...this.state.table };
                table.tableData = response.slice(start * 20, end);
                table.totalTableData = response;
                table.pageSize = Math.ceil((response.length) / 20);
                this.setState({ table });
            });
    }
    handleOnSearch (event) {
        if (event.target.value !== '') {
            const table = { ...this.state.table };
            table.lastFilterData = table.tableData;
            table.lastPage = table.currPage;
            table.tableData = [];
            table.lastFilterData.forEach(element => {
                if (Object.values(element)
                    .filter(value => value
                        .indexOf(event.target.value) !== -1)
                    .length > 0) {
                    table.tableData.push(element);
                }
            });
            table.currPage = 1;
            table.pageSize = Math.ceil((table.tableData.length) / 20);
            table.filterText = event.target.value;
            this.setState({ table });
        } else {
            const table = { ...this.state.table };
            table.tableData = table.lastFilterData;
            table.pageSize = Math.ceil((table.totalTableData.length) / 20);
            table.filterText = "";
            table.currPage = table.lastPage;
            this.setState({ table });
        }
    }
    handlePageChange (event) {
        const start = parseInt(event.target.innerText, 10) - 1;
        const end = 20;
        const table = { ...this.state.table };
        table.currPage = parseInt(event.target.innerText, 10);
        table.tableData = table.totalTableData.slice(start * 20, end + (20 * start));
        table.totalTableData = table.totalTableData;
        table.pageSize = Math.ceil((table.totalTableData.length) / 20);
        this.setState({ table });
    }
    render () {
        const { tableData, pageSize, currPage } = this.state.table;
        const pagination = [];
        const shipments = tableData.map((value, index) => {
            return (
                <div key={index} className={"cards"}>
                    <div className={"contents"}>
                        <div className={"status details-container"}>{`Status: ${value.status}`}</div>
                        <div className={"name details-container"}>{`Name: ${value.name}`}</div>
                        <div className={"destination details-container"}>{`Destination: ${value.destination}`}</div>
                        <div className={"origin details-container"}>{`Origin: ${value.origin}`}</div>
                        <div className={"mode details-container"}>{`Shipment mode: ${value.mode}`}</div>
                        <div className={"type  details-container"}>{`Shipment type: ${value.type}`}</div>
                        <div className={"total details-container"}>{`Total: ${value.total}`}</div>
                    </div>
                    <div className={"button-container"}>
                        <Link to={`/shipment/id=${value.id}`} className={"details"}>{"View Details"}</Link>
                    </div>
                </div>);
        });

        for (var index = 1; index <= pageSize; index++) {
            if (index === currPage) {
                pagination.push(
                    <span
                        key={index}
                        className={"pagination active"}>
                        {index}
                    </span>);
            } else {
                pagination.push(
                    <span
                        key={index}
                        className={"pagination"}
                        onClick={(e) => this.handlePageChange(e)}>
                        {index}
                    </span>);
            }
        }
        return (
            <div>
                <header>
                    <div className="header-container">
                        <h3>Shipment</h3>
                    </div>
                </header>
                <div className={'table-container'}>
                    <div className={"table-header"}>
                        <input type={"text"}
                            className={"filter-search"}
                            name={"filter"}
                            placeholder={"Search.."}
                            onChange={this.handleOnSearch}
                        />
                        <div className={"pagination-container"}>
                            <span className={"pagination"}>{"<"}</span>
                            {pagination}
                            <span className={"pagination"}>{">"}</span>
                        </div>
                    </div>
                </div>
                <div className={"container"}>
                    {shipments}
                </div>
            </div>
        );
    }
}
