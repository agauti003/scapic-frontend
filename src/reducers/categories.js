const initStateImage = {
    imageObjLinkToShow: '',
    imageMetaLinkToShow: ''
};
export function imageData (state = initStateImage, action) {
    switch (action.type) {
        case 'IMAGE_CLICK':
            return action.payload;
        default:
            return state;
    }
}

export function modalShow (initState = false, action) {
    switch (action.type) {
        case 'MODAL_CLICK':
            return action.payload;
        default:
            return initState;
    }
}

export function categories (initState = [], action) {
    switch (action.type) {
        case 'LOAD_CATEGORIES':
            return action.payload;
        default:
            return initState;
    }
}
export function loadMoreCount (initState = 3, action) {
    switch (action.type) {
        case 'LOAD_MORE_CATEGORIES':
            return action.payload;
        default:
            return initState;
    }
}
export function totalCategories (initialState = 0, action) {
    switch (action.type) {
        case 'TOTAL_CATEGORIES':
            return action.payload;
        default:
            return initialState;
    }
}
