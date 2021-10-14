import {createSelector} from "reselect";

export const selectOrdersList = (state) => state.orders;

export const selectOrders = createSelector(
    [selectOrdersList],
    orders => orders.orders
);

export const selectCustomerOrders = createSelector(
    [selectOrdersList],
    orders => orders.customer_orders
);