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
import EditCoupon from "../components/VendorDashboard/EditCoupon";
import StoreSettings from "../components/VendorDashboard/StoreSettings";
import AuthenticatedRoute from "../components/RouteComponents/AuthenticatedRoute";

const Routes = (props) => (

    <Switch>
        <Route exact path="/" component={Home}/>
        <AuthenticatedRoute  exact path="/admin" component={Test}/>
        <Route exact path="/register" component={AuthenticationPage}/>
        <Route exact path="/cart" component={CartPage}/>
        <Route exact path="/shop" component={Shop}/>
        <AuthenticatedRoute exact path="/vendor-products" component={VendorProductsPage}/>
        <AuthenticatedRoute exact path="/vendor-orders" component={VendorOrders}/>
        <AuthenticatedRoute exact path="/vendor-orders/:id" component={OrderDetail}/>
        <AuthenticatedRoute exact path="/vendor-customers" component={VendorCustomers}/>
        <AuthenticatedRoute exact path="/vendor-customers/VendorCustomersDetails" component={VendorCustomersDetails}/>
        <AuthenticatedRoute exact path="/vendor-coupons" component={VendorCoupons}/>
        <AuthenticatedRoute exact path="/vendor-settings" component={StoreSettings}/>

        <AuthenticatedRoute exact path="/dashboard" component={VendorDashboard}/>

        <AuthenticatedRoute exact path="/sell-now" component={SellPage}/>
        <Route exact path="/vendor-listing" component={VendorGrid}/>
        <Route exact path="/product-listing/:name" component={ProductPage}/>
        <Route exact path="/product-listing" component={ProductPage}/>
        <AuthenticatedRoute exact path="/become-vendor" component={BecomeVendor}/>
        <Route exact path="/vendors/:id" component={VendorDetail}/>
        <Route exact path="/products/:id" component={ProductDetail}/>
        <AuthenticatedRoute exact path="/edit-coupon/:id" component={EditCoupon}/>
        <AuthenticatedRoute exact path="/add" component={AddProduct}/>
        <AuthenticatedRoute exact path="/customer-orders" component={CustomerOrders}/>
        <AuthenticatedRoute exact path="/customer-orders/:id" component={CustomerOrderDetail}/>
        <Route component={NotFound}/>
    </Switch>
);

export default Routes;