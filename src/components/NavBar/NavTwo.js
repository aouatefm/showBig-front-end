import Nav from "react-bootstrap/Nav";
import './NavTwo.css'
import {createStructuredSelector} from "reselect";
import {selectRole} from "../../redux/user/user-selectors";
import {connect} from "react-redux";
import {NavLink} from "react-bootstrap";

function NavTwo({role}) {
    const activeStyle = {color: 'white'};
    console.log(role)
    return (
        <div className="App">
            <Nav style={{
                backgroundColor: "#EEEE23",
                borderTop: "1px solid gray",
                height: "50px",
                justifyContent: "center",
                alignItems: "center"
            }} activeStyle={activeStyle} activeKey="/home">
                <Nav.Item>
                    <NavLink href="/product-listing" className="nav">Shop</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="vendor-listing" className="nav">Vendor Stores</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#" className="nav">Contact</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#" className="nav">About us</Nav.Link>
                </Nav.Item>



                <Nav.Item>
                    <Nav.Link href="/dashboard" className="nav">Vendor Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/become-vendor" className="nav">Become a Vendor</Nav.Link>
                </Nav.Item>
                {/*TODO: `remove the comment to switch between vendor and user*/}
                {/*{*/}
                {/*role === 'vendor' ?*/}
                {/*<Nav.Item>*/}
                {/*    <Nav.Link href="/dashboard" className="nav">Vendor Dashboard</Nav.Link>*/}
                {/*</Nav.Item>*/}
                {/*:*/}
                {/*<Nav.Item>*/}
                {/*    <Nav.Link href="/become-vendor" className="nav">Become a Vendor</Nav.Link>*/}
                {/*</Nav.Item>*/}
                {/*}*/}

                <Nav.Item>
                    <Nav.Link href="/vendor-orders" className="nav">Vendor Orders</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/customer-orders" className="nav">Customer Orders</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#" disabled>FAQ</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    role: selectRole,
});
export default connect(mapStateToProps)(NavTwo);
