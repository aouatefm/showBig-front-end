import React from 'react';
import SearchFormOrders from "./SearchFormOrders";
import NavThree from "../NavBar/NavThree";
import OrderPresentation from "../Order/OrderPresentation";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user-selectors";
import {connect} from "react-redux";
import {selectOrders} from "../../redux/orders/order-selectors";
import Spinner from "../Spinner/Spinner";



const VendorOrders = ({orders}) => {
    //const orders = useOrders()
    console.log(orders)


    return (
        <div>
            <div className="row">
                <div className="col col-lg-2">
                    <NavThree/>
                </div>
                <div className="col">
                    <h1>Orders</h1>
                    <SearchFormOrders/>
                    {orders ? <OrderPresentation orders={orders}/> : <div style={{marginLeft:"500px"}}><Spinner/></div>}
                </div>
            </div>
        </div>

    );

}

const mapStateToProps = createStructuredSelector(
    {
        currentUser: selectCurrentUser,
        orders : selectOrders
    }
);
export default connect(mapStateToProps)(VendorOrders);

