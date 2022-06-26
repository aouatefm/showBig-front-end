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
import Unauthorized from "./Unauthorized/Unauthorized";
import ProtectedRoute from "../components/RouteComponents/ProtectedRoute";
import PrivateRoute from "../components/RouteComponents/PrivateRoute";
import CartPage from "./CartPage/CartPage";
import AboutUs from "./AboutUs/AboutUs";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import StoreManagement from "../components/DashboardComponent/StoreManagement";
import AdminKpIs from "../components/DashboardComponent/AdminKPIs";
import ProfilePage from "./ProfilePage/ProfilePage";
import AdminRoute from "../components/RouteComponents/AdminRoute";
import VendorRoute from "../components/RouteComponents/VendorRoute";
import VendorPage from "./VendorPage/VendorPage";
import EditProfile from "./ProfilePage/EditProfile";
import AddUser from "./AuthenticationPage/AddUser";
import EditProduct from "../components/VendorDashboard/EditProduct";

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/register" component={AuthenticationPage}/>
        <Route exact path="/cart" component={CartPage}/>
        <Route exact path="/shop" component={Shop}/>
         <AdminRoute exact path="/admin" component={AdminDashboard}/>
         <Route exact path="/about" component={AboutUs}/>
        <PrivateRoute exact path="/vendor-products" component={VendorProductsPage}/>
        <PrivateRoute exact path="/vendor-orders" component={VendorOrders}/>
        <PrivateRoute exact path="/vendor-orders/:id" component={OrderDetail}/>
        <PrivateRoute exact path="/vendor-customers" component={VendorCustomers}/>
        <PrivateRoute exact path="/vendor-customers/VendorCustomersDetails" component={VendorCustomersDetails}/>
        <PrivateRoute exact path="/vendor-coupons" component={VendorCoupons}/>
        <PrivateRoute exact path="/vendor-settings" component={StoreSettings}/>
        <PrivateRoute exact path="/dashboard" component={VendorDashboard} />
        <PrivateRoute exact path="/sell-now" component={SellPage}/>

        <Route exact path="/product-listing/:name" component={ProductPage}/>
        <VendorRoute exact path="/become-vendor" component={BecomeVendor}/>

        <Route exact path="/product-listing" component={ProductPage}/>
        <Route exact path="/products/:id" component={ProductDetail}/>

        <Route exact path="/vendor-listing" component={VendorPage}/>
        <Route exact path="/vendors/:id" component={VendorDetail}/>

        <PrivateRoute exact path="/edit-coupon/:id" component={EditCoupon}/>
        <PrivateRoute exact path="/add" component={AddProduct}/>
        <PrivateRoute exact path="/edit_product/:uid" component={EditProduct}/>
        <PrivateRoute exact path="/kpis" component={AdminKpIs}/>
        <PrivateRoute exact path="/store-management" component={StoreManagement}/>
        <ProtectedRoute exact path="/add-user" component={AddUser}/>
        <ProtectedRoute exact path="/customer-orders" component={CustomerOrders}/>
        <ProtectedRoute exact path="/profile_page" component={ProfilePage}/>
        <ProtectedRoute exact path="/edit_profile/:uid" component={EditProfile}/>
        <ProtectedRoute exact path="/customer-orders/:id" component={CustomerOrderDetail}/>
        <Route exact path="/unauthorized" component={Unauthorized}/>
        <Route component={NotFound}/>
    </Switch>
);

export default Routes;