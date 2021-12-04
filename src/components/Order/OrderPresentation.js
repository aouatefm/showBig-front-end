import React, {useEffect, useState} from 'react';
import Moment from "moment";
import NavThree from "../NavBar/NavThree";
import { orderStatus} from "../../utils";
import {createStructuredSelector} from "reselect";
import {select_order_filters, selectStatus,} from "../../redux/filters/filters-selectors";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";

const useUserName = (id) => {
    const [user, setUser] = useState([]);
    useEffect(async () => {
        const userProfile = await UserService.getUser(id)
            setUser(userProfile);

    }, [])
    return user
}


const OrderPresentation = ({orders,order_filters}) => {
    const name =useUserName('EbgYD1zroKX2bpzmUwHklEMhLk82')
    const keywordsMatched = (item,Keywords) => {
        const formattedKeywords = Keywords.trim().replace(/\s/g, '').toLowerCase();
        if (formattedKeywords.length === 0) return true;
        const {id} = item;
        const formattedName = id.toLowerCase();
        return formattedName.includes(formattedKeywords)
    }
    const applyFiltersOrders = (orders) => {
        let itemsToDisplay = orders.filter(
            item =>
                (Moment(order_filters.date).format('MM/DD/YYYY') === Moment(item.order_date).format('MM/DD/YYYY') || order_filters.date === '' ) &&
                (order_filters.status.includes(item.status) || order_filters.status === 'all') &&
                keywordsMatched(item ,order_filters.customer) &&
                keywordsMatched(item ,order_filters.orderId)
        )
        return itemsToDisplay;

    }
    return (
        <div className="container">
            <br/>
            <p>
                <a> All ({orders.length})</a> |
                <a style={{color :"#28A745"}}> Completed ({orders.filter(function(item){return item.status === 'completed'}).length})</a> |
                <a style={{color :"#17A2B8"}}> Pending ({orders.filter(function(item){return item.status === 'pending'}).length})</a> |
                <a style={{color :"#DC3545"}}> Canceled ({orders.filter(function(item){return item.status === 'canceled'}).length})</a> |
                <a style={{color :"#FFC107"}}> Processing ({orders.filter(function(item){return item.status === 'processing'}).length})</a>
            </p>
            <table className="table table-hover table-bordered ">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Order</th>
                    <th scope="col">Order Total ($)</th>
                    <th scope="col">Status</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Date</th>
                    <th scope="col">View</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders ?
                        <>
                            {applyFiltersOrders(orders).map((order, index) => (
                                <tr key={order.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td><span style={{fontWeight: 'bold', color: 'orange'}}>{order.id}</span></td>
                                    <td style={{textAlign :"center"}}>{order.total_price} $</td>
                                    <td>
                                        <span className={`badge badge-${orderStatus(order.status)}`}>{order.status}</span>
                                    </td>
                                    <td>{order.customer_id}</td>
                                    <td>{Moment(order.order_date).format('MM/DD/YYYY')}</td>
                                    <td>
                                    {/*<Link to={{ pathname: `/vendor-orders/${order.id}`}} style={{textDecoration : "none"}}>*/}
                                    {/*    Details*/}
                                    {/*</Link>*/}
                                        <Link to={{ pathname: `/vendor-orders/${order.id}`, state : {order: order}}} style={{textDecoration : "none"}}>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </>
                        :
                        <div className="row">
                            <div className="col col-lg-2">
                                <NavThree/>
                            </div>
                            <div className="col">
                                <h1>Loading ..</h1>
                            </div>
                        </div>

                }
                </tbody>
            </table>
        </div>
    );

}
const mapStatetoProps = createStructuredSelector({
    status: selectStatus,
    order_filters : select_order_filters

});
export default connect(mapStatetoProps)(OrderPresentation);
