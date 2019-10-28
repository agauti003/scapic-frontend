import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleImageClick } from '../../actions';

function Models (props) {
    return (
        <div className={"image-holder"}>
            <div className="carousel-item-container">
                <br />
                <div className={"img-wrapper parent-image"}>
                    <img
                        src={props.model3dObject.thumb}
                        className={"images-conatiner"}
                        alt="Images"
                        width="100%"
                        height="150px"
                        obj-attr={props.model3dObject.obj}
                        mtl-attr={props.model3dObject.mtl}
                        onClick={(event) => props.handleImageClick(event, props.modalShow)}
                    />
                </div>
                <div className={"item-details-wrappe"}>
                    <h6 className="item-title">{props.model3dObject.name}</h6>
                </div>
            </div>
        </div>
    );
}

Models.propTypes = {
    handleImageClick: PropTypes.func,
    model3dObject: PropTypes.object,
    modalShow: PropTypes.bool
};
const mapDispatchToProps = dispatch => ({
    handleImageClick: payload => dispatch(handleImageClick(payload))
});
const mapStateToProps = state => ({
    modalShow: state.modalShow
});

export default connect(mapStateToProps, mapDispatchToProps)(Models);

