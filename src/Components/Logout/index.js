import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { logout } from '../../actions/accounts';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class index extends PureComponent {
    constructor (props) {
        super(props);
    }
    render () {
        this.props.logout();
        if (this.props.loginComplete === null) {
            return <Redirect to={"/login"} />;
        }
        return (
            <div />
        );
    }
}
index.propTypes = {
    logout: PropTypes.func,
    loginComplete: PropTypes.string
};
const mapDispatchToProps = dispatch => ({
    logout: payload => dispatch(logout(payload))
});
const mapStateToProps = state => ({
    loginComplete: state.loginComplete
});
export default connect(mapStateToProps, mapDispatchToProps)(index);
