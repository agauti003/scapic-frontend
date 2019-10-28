/* eslint-disable no-alert */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { register, socialsRegister } from '../../actions/accounts';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import './index.scss';
const oauthConfig = require('../../../oauth.config.json');

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
        this.responseGoogle = this.responseGoogle.bind(this);
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
    responseGoogle (event) {
        this.props.socialsRegister({ ...event });
    }
    render () {
        if (this.props.registerComplete !== null && sessionStorage.getItem("accessToken")) {
            return (<Redirect to={"/homepage"} />);
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
                            <GoogleLogin
                                clientId={oauthConfig.googleClientId}
                                className={"google-button"}
                                buttonText={"google register"}
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
index.propTypes = {
    register: PropTypes.func,
    socialsRegister: PropTypes.func,
    registerComplete: PropTypes.bool
};
const mapDispatchToProps = dispatch => ({
    register: payload => dispatch(register(payload)),
    socialsRegister: payload => dispatch(socialsRegister(payload))
});
const mapStateToProps = state => ({
    registerComplete: state.registerComplete
});
export default connect(mapStateToProps, mapDispatchToProps)(index);
