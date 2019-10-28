import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleImageClick } from '../../actions';
const config = require('../../actions/config.json');
const s3Url = 'https://s3.ap-south-1.amazonaws.com/scapic-others/Models';

function Models (props) {
    const { obj, mtl, thumb } = props.model3dObject;
    const replaceUrl = `${config.url}/gateway`;
    const models = {
        mtl: mtl.replace(s3Url, replaceUrl),
        obj: obj.replace(s3Url, replaceUrl)
    };
    return (
        <div className={"image-holder"}>
            <div className="carousel-item-container">
                <br />
                <div className={"img-wrapper parent-image"}>
                    <img
                        src={thumb}
                        className={"images-conatiner"}
                        alt="Images"
                        width="100%"
                        height="150px"
                        obj-attr={models.obj}
                        mtl-attr={models.mtl}
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

