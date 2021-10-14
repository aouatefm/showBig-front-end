import ProductActionTypes from './product-types';

const INITIAL_STATE = {
    products : null,
};

const productReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ProductActionTypes.SET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            }

        default:
            return state;
    }
}

export default productReducer;