import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound/NotFound';
import SellPage from "./SellPage/SellPage";
import AuthenticationPage from "./AuthenticationPage/AuthenticationPage";
import ProductPage from "./ProductPage/ProductPage";
import VendorDetail from "../components/VendorDetail/VendorDetail";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import VendorDashboard from "../components/VendorDashboard/VendorDashboard";
import VendorOrders from "../components/VendorDashboard/VendorOrders";
import VendorCustomers from "../components/VendorDashboard/VendorCustomers";
import VendorCoupons from "../components/VendorDashboard/VendorCoupons";
import BecomeVendor from "../components/BecomeVendor/BecomeVendor";
import CartPage from "./CartPage/CartPage";
import Test from "./AdminDashboard/Test";
import AddProduct from "../components/VendorDashboard/AddProduct";
import VendorGrid from "../components/VendorGrid/VendorGrid";
import VendorProductsPage from "./VendorDashboard/VendorProductsPage";
import Shop from "./Shop/Shop";
import OrderDetail from "../components/Order/OrderDetail";
import CustomerOrders from "../components/Order/CustomerOrders";
import CustomerOrderDetail from "../components/Order/CustomerOrderDetail";
import VendorCustomersDetails from "../components/VendorDashboard/VendorCustomersDetails";

const Routes = (props) => (

    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/admin" component={Test}/>
        <Route exact path="/register" component={AuthenticationPage}/>
        <Route exact path="/cart" component={CartPage}/>
        <Route exact path="/shop" component={Shop}/>
        <Route exact path="/vendor-products" component={VendorProductsPage}/>
        <Route exact path="/vendor-orders" component={VendorOrders}/>
        <Route exact path="/vendor-orders/:id" component={OrderDetail}/>
        <Route exact path="/vendor-customers" component={VendorCustomers}/>
        <Route exact path="/vendor-customers/VendorCustomersDetails" component={VendorCustomersDetails}/>
        <Route exact path="/vendor-coupons" component={VendorCoupons}/>
        <Route exact path="/dashboard" component={VendorDashboard}/>
        <Route exact path="/sell-now" component={SellPage}/>
        <Route exact path="/vendor-listing" component={VendorGrid}/>
        <Route exact path="/product-listing/:name" component={ProductPage}/>
        <Route exact path="/product-listing" component={ProductPage}/>
        <Route exact path="/become-vendor" component={BecomeVendor}/>
        <Route exact path="/vendors/:id" component={VendorDetail}/>
        <Route exact path="/products/:id" component={ProductDetail}/>
        <Route exact path="/add" component={AddProduct}/>
        <Route exact path="/customer-orders" component={CustomerOrders}/>
        <Route exact path="/customer-orders/:id" component={CustomerOrderDetail}/>
        <Route component={NotFound}/>
    </Switch>
);

export default Routes;