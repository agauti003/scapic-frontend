/* eslint-disable no-alert */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { register } from '../../actions/accounts';
import { connect } from 'react-redux';
import './index.css';

class index extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit (event) {
        event.preventDefault();
        if (this.state.email !== "" ||
            this.state.password !== "" ||
            this.state.name !== "") {
            this.props.register(this.state);
        }
    }
    render () {
        if (this.props.registerComplete !== null && sessionStorage.getItem("accessToken")) {
            alert("user sucessfully registered \nPlease login now");
            return (<Redirect to={"/login"} />);
        }
        return (
            <div className={"main-container"}>
                <div className={"login-form-container"}>
                    <form onSubmit={this.handleSubmit} >
                        <div className={"label-container"}>
                            <span className={"label-text"}>
                                Name
                            </span>
                        </div>
                        <div className={"input-container"}>
                            <input
                                type={"text"}
                                className={"name"}
                                name={"name"}
                                onChange={this.handleChange}
                                value={this.state.name} />
                        </div>
                        <div className={"label-container"}>
                            <span className={"label-text"}>
                                Email
                            </span>
                        </div>
                        <div className={"input-container"}>
                            <input
                                type={"email"}
                                className={"email"}
                                name={"email"}
                                onChange={this.handleChange}
                                value={this.state.email} />
                        </div>
                        <div className={"label-container"}>
                            <span className={"label-text"}>
                                Password
                            </span>
                        </div>
                        <div className={"input-container"}>
                            <input
                                type={"password"}
                                className={"password"}
                                name={"password"}
                                onChange={this.handleChange}
                                value={this.state.password} />
                        </div>
                        <br />
                        <div className={"submit-button-container"}>
                            <button
                                type={"submit"}
                                className={"submit-button"}
                                onClick={this.handleSubmit}>
                                Register
                            </button>
                        </div>
                        <div className={"google-button-container"}>
                            <button
                                className={"google-button"}
                                onClick={this.handleSubmit}>
                                <img src="https://colorlib.com/etc/lf/Login_v5/images/icons/icon-google.png" alt="GOOGLE" />
                                &nbsp;Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
index.propTypes = {
    register: PropTypes.func,
    registerComplete: PropTypes.bool
};
const mapDispatchToProps = dispatch => ({
    register: payload => dispatch(register(payload))
});
const mapStateToProps = state => ({
    registerComplete: state.registerComplete
});
export default connect(mapStateToProps, mapDispatchToProps)(index);
