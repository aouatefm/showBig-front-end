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
                        <li><a href="#"><i className="fas fa-map-pin"/>Settings</a></li>
                    </ul>
                    <div className="social_media">
                        {/*<a href="#"><i className="fab fa-facebook-f"></i></a>*/}
                        {/*<a href="#"><i className="fab fa-twitter"></i></a>*/}
                        {/*<a href="#"><i className="fab fa-instagram"></i></a>*/}
                    </div>
                </div>
                {/*<div className="main_content">*/}
                {/*    <div className="header">Welcome!! Have a nice day.</div>*/}
                {/*    <div className="info">*/}
                {/*        <div>!</div>*/}
                {/*        <div>!!</div>*/}
                {/*        <div>!!!</div>*/}
                {/*    </div>*/}
                {/*</div>*/}


            {/*<Nav defaultActiveKey="/home" className="flex-column"*/}
            {/*     style={{*/}
            {/*         backgroundColor: "#F1F2F6",*/}
            {/*         // borderTop: "1px solid gray" ,*/}
            {/*          width :"320px" ,*/}
            {/*         height : "100%",*/}
            {/*         //justifyContent : "center",*/}
            {/*          alignItems : "center",*/}
            {/*         // alignContent: "center"*/}
            {/*     }}*/}
            {/*>*/}
            {/*    <Nav.Item><Nav.Link href="/dashboard" className="nav3">Dashboard</Nav.Link></Nav.Item>*/}
            {/*    <Nav.Item> <Nav.Link href="/vendor-products" className="nav3">Products</Nav.Link></Nav.Item>*/}
            {/*    <Nav.Item> <Nav.Link href="/vendor-orders" className="nav3">Orders</Nav.Link></Nav.Item>*/}
            {/*    <Nav.Item> <Nav.Link href="/vendor-customers" className="nav3">Customers</Nav.Link></Nav.Item>*/}
            {/*    <Nav.Item> <Nav.Link href="#" className="nav3">Categories</Nav.Link></Nav.Item>*/}
            {/*    <Nav.Item> <Nav.Link href="/vendor-coupons" className="nav3">Coupon</Nav.Link></Nav.Item>*/}
            {/*    <Nav.Item> <Nav.Link href="#" className="nav3">Settings</Nav.Link></Nav.Item>*/}
            {/*</Nav>*/}



            {/*<Nav*/}
            {/*    style={{backgroundColor :"black" ,*/}
            {/*        borderTop: "1px solid gray" ,*/}
            {/*        height :"30px" ,*/}
            {/*        justifyContent : "center",*/}
            {/*        alignItems : "center",*/}
            {/*        alignContent: "center"}}>*/}

            {/*    <Nav.Item>*/}
            {/*        <Nav.Link href="/dashboard" className="nav3">Dashboard</Nav.Link>*/}
            {/*    </Nav.Item>*/}
            {/*    <Nav.Item>*/}
            {/*        <Nav.Link href="/vendor-products" className="nav3">Products</Nav.Link>*/}
            {/*    </Nav.Item>*/}
            {/*    <Nav.Item>*/}
            {/*        <Nav.Link href="/vendor-orders" className="nav3">Orders</Nav.Link>*/}
            {/*    </Nav.Item>*/}
            {/*    <Nav.Item>*/}
            {/*        <Nav.Link href="/vendor-customers" className="nav3">Customers</Nav.Link>*/}
            {/*    </Nav.Item>*/}
            {/*    <Nav.Item>*/}
            {/*        <Nav.Link href="#" className="nav3">Categories</Nav.Link>*/}
            {/*    </Nav.Item>*/}
            {/*    <Nav.Item>*/}
            {/*        <Nav.Link href="/vendor-coupons" className="nav3">Coupon</Nav.Link>*/}
            {/*    </Nav.Item>*/}
            {/*    <Nav.Item>*/}
            {/*        <Nav.Link href="#" className="nav3">Settings</Nav.Link>*/}
            {/*    </Nav.Item>*/}
            {/*</Nav>*/}
        </div>
    );
}

const Sidebar = withRouter(NavThree);
export default Sidebar