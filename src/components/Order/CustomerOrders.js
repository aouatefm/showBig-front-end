import React from 'react';
import {createStructuredSelector} from "reselect";
import {selectCustomerOrders} from "../../redux/orders/order-selectors";
import {connect} from "react-redux";
import {orderStatus} from "../../utils";
import {Link} from "react-router-dom";

const CustomerOrders = ({customerOrders}) => {
    console.log(customerOrders)
        return (
            <div className="container">
                <h4>Recent Orders</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Order</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Total</th>
                        <th scope="col">Vendor</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        customerOrders ?
                            <>
                                {customerOrders.map((order,index) => (
                                    <tr>
                                        <th scope="row">{order.id}</th>
                                        <td>{order.order_date}</td>
                                        <td><span className={`badge badge-${orderStatus(order.status)}`}>{order.status}</span></td>
                                        <td>{order.total_price}</td>
                                        <td>{order.store_id}</td>
                                        <td><Link to={{ pathname: `/customer-orders/${order.id}`}}>View Details</Link></td>
                                    </tr>
                                ))
                                }
                            </> :
                            <h6>Loading ...</h6>
                    }
                    </tbody>
                </table>
            </div>
        );

}

const mapStateToProps = createStructuredSelector(
    {
        customerOrders : selectCustomerOrders
    }
);
export default connect(mapStateToProps)(CustomerOrders);
