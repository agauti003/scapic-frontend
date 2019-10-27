import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Models from './Models';
import Slider from "react-slick";
const settings = require("./SlideSetting.json");
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { handleLoadMoreClick } from '../../actions';

function Categories (props) {
    const categories = [];
    props.categoryData.some((elem, categoriesIndex) => {
        let models = [];
        if (categoriesIndex < props.loadMoreCount) {
            elem.models.some((model3dObject, index) => {
                models.push(<Models
                    key={elem.name + index + categoriesIndex}
                    model3dObject={model3dObject}
                />);
            });
            categories.push(
                <span key={elem.name + categoriesIndex} className={""}>
                    <div>
                        <header className={"category-header"}>
                            {elem.name}
                        </header>
                    </div>
                    <Slider {...settings}>
                        {models}
                    </Slider>
                </span>
            );
        } else if (categoriesIndex === props.loadMoreCount &&
            categoriesIndex < props.categoryData.length) {
            categories.push(
                <div
                    key={categoriesIndex}
                    className={"load-more-container"}
                    onClick={() => props.handleLoadMoreClick(props.loadMoreCount)}>
                    {"Load More..."}
                </div>
            );
        } else {
            return true;
        }
    });
    return (<span>
        {categories}
    </span>);
}
const mapDispatchToProps = dispatch => ({
    handleLoadMoreClick: payload => dispatch(handleLoadMoreClick(payload))
});
const mapStateToProps = state => ({
    loadMoreCount: state.loadMoreCount
});
Categories.propTypes = {
    handleLoadMoreClick: PropTypes.func,
    handleImageClick: PropTypes.func,
    loadMoreCount: PropTypes.number,
    categoryData: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
