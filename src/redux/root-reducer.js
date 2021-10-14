
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user-reducer';
import spinnerReducer from './spinner/spinner-reducer';
import cartReducer from "./cart/cart-reducer";
import filtersReducer from "./filters/filters-reducer";
import productReducer from "./product/product-reducer";
import orderReducer from "./orders/order-reducer";

const persistConfig = {
    key: 'root',
    storage, // local storage
    whitelist: ['cart','user']

}

const rootReducer = combineReducers({
    user: userReducer,
    spinner: spinnerReducer,
    cart: cartReducer,
    filters: filtersReducer,
    products :productReducer,
    orders : orderReducer
});

export default persistReducer(persistConfig, rootReducer);