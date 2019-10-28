import React, { PureComponent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, socialLogin } from '../../actions/accounts';
import GoogleLogin from 'react-google-login';
import './index.scss';
const oauthConfig = require('../../../oauth.config.json');

class index extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
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
    handleSubmit () {
        event.preventDefault();
        if (this.state.email !== "" || this.state.password !== "") {
            this.props.login(this.state);
        }
    }
    responseGoogle (event) {
        this.props.socialLogin({ ...event });
    }
    render () {
        if (this.props.loginComplete !== null && sessionStorage.getItem("accessToken")) {
            return (<Redirect to={"/homepage"} />);
        }
        return (
            <div className={"main-container"}>
                <div className={"login-form-container"}>
                    <form onSubmit={this.handleSubmit} >
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
                                Login
                            </button>
                        </div>
                        <div className={"google-button-container"}>
                            <GoogleLogin
                                clientId={oauthConfig.googleClientId}
                                className={"google-button"}
                                buttonText={"google login"}
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                            />
                        </div>
                        <div className={"register"}>
                            <span className={"label-text"}>
                                <Link to={"/register"}
                                    className={"sign-up"}>Sign Up</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
index.propTypes = {
    login: PropTypes.func,
    socialLogin: PropTypes.func,
    loginComplete: PropTypes.string
};
const mapDispatchToProps = dispatch => ({
    login: payload => dispatch(login(payload)),
    socialLogin: payload => dispatch(socialLogin(payload))
});
const mapStateToProps = state => ({
    loginComplete: state.loginComplete
});
export default connect(mapStateToProps, mapDispatchToProps)(index);
