import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Categories from './Categories/Categories';
import { handleModalToggle } from '../actions';
const modelData = require('./Categories/models.json');
import Box from './Categories/Box';
import './App.css';

class App extends PureComponent {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div>
                <header>
                    <div className="header-container">
                        <h3>3D Models</h3>
                    </div>
                </header>
                <div className={"fade-in main-content-wrapper"}>
                    <Categories categoryData={modelData.categories} />
                </div>
                {this.props.modalShow ? <div id="myModal" className="modal">
                    <div className="modal-content">
                        <button
                            className="close"
                            onClick={this.props.handleModalToggle}>&times;</button>
                        <div className={'box-container'}>
                            <Box
                                obj={this.props.imageObjLinkToShow}
                                mtl={this.props.imageMetaLinkToShow} />
                        </div>
                    </div>
                </div> : ""}
            </div>
        );
    }
}

App.propTypes = {
    modalShow: PropTypes.bool,
    handleModalToggle: PropTypes.func,
    imageObjLinkToShow: PropTypes.string,
    imageMetaLinkToShow: PropTypes.string
};
const mapDispatchToProps = dispatch => ({
    handleModalToggle: payload => dispatch(handleModalToggle(payload))
});
const mapStateToProps = state => ({
    modalShow: state.modalShow,
    imageObjLinkToShow: state.imageData.imageObjLinkToShow,
    imageMetaLinkToShow: state.imageData.imageMetaLinkToShow
});
export default connect(mapStateToProps, mapDispatchToProps)(App);


