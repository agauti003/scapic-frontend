import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Categories from './Categories';
import { handleModalToggle, handleLoadCategories } from '../../actions';
import Box from './Box';
import './index.css';

class index extends Component {
    constructor (props) {
        super(props);
        this.state = {
            page: 1,
            isloadedCategories: 0
        };
    }
    componentDidMount () {
        const params = { ...this.state, ...this.props };
        this.props.handleLoadCategories({ ...params });
    }
    render () {
        return (
            <div>
                <header>
                    <div className="header-container">
                        <h3>3D Models</h3>
                        <Link
                            to={"/logout"}
                            className={"logout-text"}>
                            Logout
                        </Link>
                    </div>
                </header>
                <div className={"fade-in main-content-wrapper"}>
                    <Categories categoryData={this.props.categories} />
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

index.propTypes = {
    modalShow: PropTypes.bool,
    handleModalToggle: PropTypes.func,
    imageObjLinkToShow: PropTypes.string,
    imageMetaLinkToShow: PropTypes.string,
    categories: PropTypes.array,
    handleLoadCategories: PropTypes.func
};
const mapDispatchToProps = dispatch => ({
    handleModalToggle: payload => dispatch(handleModalToggle(payload)),
    handleLoadCategories: payload => dispatch(handleLoadCategories(payload))
});
const mapStateToProps = state => ({
    modalShow: state.modalShow,
    categories: state.categories,
    imageObjLinkToShow: state.imageData.imageObjLinkToShow,
    imageMetaLinkToShow: state.imageData.imageMetaLinkToShow
});
export default connect(mapStateToProps, mapDispatchToProps)(index);


