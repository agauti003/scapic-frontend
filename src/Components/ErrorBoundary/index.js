import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);
        this.state = { hasError: false, error: '', errorInfo: '' };
    }

    static getDerivedStateFromError (error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch (error, errorInfo) {
        // You can also log the error to an error reporting service
        this.setState({ error, errorInfo });
    }

    render () {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (<div>
                <h1>Something went wrong.</h1>
                <p style={{ backgroundColor: '#888' }}>{this.state.error}</p>
            </div>);
        }

        return this.props.children;
    }
}
ErrorBoundary.propTypes = {
    children: PropTypes.object
};
