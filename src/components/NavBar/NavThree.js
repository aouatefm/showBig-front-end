import Nav from "react-bootstrap/Nav";
import './NavThree.css'
import {withRouter} from "react-router-dom";

function NavThree() {
    return (
        // <div className="App">
            <div className="wrapper">
                <div className="sidebar">
                    <h2>Dashboard</h2>
                    <ul>
                        <li><a href="/dashboard"><i className="fas fa-home"/>Dashboard</a></li>
                        <li><a href="/vendor-products"><i className="fas fa-user"/>Products</a></li>
                        <li><a href="/vendor-orders"><i className="fas fa-address-card"/>Orders</a></li>
                        <li><a href="/vendor-customers"><i className="fas fa-project-diagram"/>Customers</a></li>
                        <li><a href="#"><i className="fas fa-blog"/>Categories</a></li>
                        <li><a href="/vendor-coupons"><i className="fas fa-address-book"/>Coupon</a></li>
                        <li><a href="/vendor-settings"><i className="fas fa-map-pin"/>Settings</a></li>
                    </ul>
                    <div className="social_media">
                        {/*<a href="#"><i className="fab fa-facebook-f"></i></a>*/}
                        {/*<a href="#"><i className="fab fa-twitter"></i></a>*/}
                        {/*<a href="#"><i className="fab fa-instagram"></i></a>*/}
                    </div>
                </div>

        </div>
    );
}

const Sidebar = withRouter(NavThree);
export default Sidebar