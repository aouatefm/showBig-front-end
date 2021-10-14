import OrderActionTypes from './order-types';

const INITIAL_STATE = {
    orders : null,
    customer_orders :null
};

const orderReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case OrderActionTypes.SET_ALL_ORDERS:
            return {
                ...state,
                orders: action.payload,
            }
        case OrderActionTypes.SET_CUSTOMER_ORDERS:
            return {
                ...state,
                customer_orders: action.payload,
            }
        case OrderActionTypes.GET_ALL_ORDER:
            return {
                ...state,
            }

        default:
            return state;
    }
}
export default orderReducer;