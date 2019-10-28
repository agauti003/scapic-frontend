const config = require("./config.json");


export const handleModalToggle = initState => ({
    type: 'MODAL_CLICK',
    payload: !initState
});

export const getTotalCategories = (totalCount) => {
    return ({
        type: 'TOTAL_CATEGORIES',
        payload: totalCount
    });
};

export const handleLoadCategories = initState => {
    let page = initState.page;
    let categories = initState.categories;
    let headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': sessionStorage.getItem('accessToken')
    });
    return dispatch => {
        fetch(`${config.url}/models/${page}`, {
            headers,
            method: "GET"
        })
            .then(resp => resp.json())
            .then(responseData => {
                dispatch({
                    type: 'LOAD_CATEGORIES',
                    payload: categories.concat(responseData.data.categories)
                });
                dispatch(
                    getTotalCategories(responseData.data.totalCategories)
                );
            });
    };
};

export const handleLoadMoreCategories = initState => {
    const params = { ...initState };
    params.categories = params.categoryData;
    return dispatch => {
        dispatch({
            type: 'LOAD_MORE_CATEGORIES',
            payload: initState.loadMoreCount + 3
        });
        dispatch(
            handleLoadCategories({
                page: initState.totalCategories / initState.loadMoreCount,
                ...params
            })
        );
    };
};

export const handleImageClick = (event, modalState) => {
    const imageObjLinkToShow = event.target.getAttribute('obj-attr');
    const imageMetaLinkToShow = event.target.getAttribute('mtl-attr');
    return dispatch => {
        dispatch({
            type: 'IMAGE_CLICK',
            payload: {
                imageObjLinkToShow,
                imageMetaLinkToShow
            }
        });
        dispatch(handleModalToggle(modalState));
    };
};
