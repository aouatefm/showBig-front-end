
import ProductActionTypes from './product-types';

export const setAllProducts = (products) => ({
    type: ProductActionTypes.SET_ALL_PRODUCTS,
    payload: products,
});
export const getAllProducts = () => ({
    type: ProductActionTypes.GET_ALL_PRODUCT,
});
