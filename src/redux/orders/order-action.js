import OrdersActionTypes from './order-types';

export const setAllOrders = (orders) => ({
    type: OrdersActionTypes.SET_ALL_ORDERS,
    payload: orders,
});
export const setCustomerOrders = (customer_orders) => ({
    type: OrdersActionTypes.SET_CUSTOMER_ORDERS,
    payload: customer_orders,
});
export const getAllOrders = () => ({
    type: OrdersActionTypes.GET_ALL_ORDERS,
});
