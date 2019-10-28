import { combineReducers } from 'redux';
import { imageData, modalShow, loadMoreCount, categories, totalCategories } from './categories';
import { login, register } from './accounts';
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */
const rootReducer = combineReducers({
    imageData,
    modalShow,
    loadMoreCount,
    loginComplete: login,
    totalCategories,
    categories,
    registerComplete: register
});

export default rootReducer;
