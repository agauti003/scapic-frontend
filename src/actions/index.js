export const handleModalToggle = initState => ({
    type: 'MODAL_CLICK',
    payload: !initState
});

export const handleLoadMoreClick = initState => {
    return ({
        type: 'LOAD_MORE_CATEGORIES',
        payload: initState + 3
    });
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
