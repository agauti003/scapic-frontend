import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Models from './Models';
import Slider from "react-slick";
const settings = require("./SlideSetting.json");
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { handleLoadMoreCategories } from '../../actions';

function Categories (props) {
    const categories = [];
    props.categoryData.some((elem, categoriesIndex) => {
        let models = [];
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
    });
    if (props.totalCategories > props.loadMoreCount) {
        categories.push(
            <div
                key={props.totalCategories}
                className={"load-more-container"}
                onClick={() => props.handleLoadMoreCategories({ ...props })}>
                {"Load More..."}
            </div>
        );
    }
    return (<span>
        {categories}
    </span>);
}
const mapDispatchToProps = dispatch => ({
    handleLoadMoreCategories: payload => dispatch(handleLoadMoreCategories(payload))
});
const mapStateToProps = state => ({
    loadMoreCount: state.loadMoreCount,
    totalCategories: state.totalCategories
});
Categories.propTypes = {
    handleLoadMoreCategories: PropTypes.func,
    handleImageClick: PropTypes.func,
    loadMoreCount: PropTypes.number,
    totalCategories: PropTypes.number,
    categoryData: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
