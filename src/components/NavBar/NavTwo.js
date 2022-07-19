import Nav from "react-bootstrap/Nav";
import './NavTwo.css'
import {createStructuredSelector} from "reselect";
import {selectRole} from "../../redux/user/user-selectors";
import {connect} from "react-redux";
import {NavLink} from "react-bootstrap";

function NavTwo({role}) {
    const activeStyle = {color: 'white'};
    return (
        <div className="App">
            <Nav style={{
                backgroundColor: "#FFFD38",
                borderTop: "1px solid gray",
                height: "50px",
                justifyContent: "center",
                alignItems: "center"
            }} activeStyle={activeStyle} activeKey="/home">
                <Nav.Item>
                    <NavLink href="/product-listing" className="nav">Shop</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="vendor-listing" className="nav">Stores</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#" className="nav">Contact</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/about" className="nav">About us</Nav.Link>
                </Nav.Item>



                <Nav.Item>
                    <Nav.Link href="/dashboard" className="nav">Vendor Dashboard</Nav.Link>
                </Nav.Item>
                {role === 'user' &&
                <Nav.Item>
                    <Nav.Link href="/become-vendor" className="nav">Become a Vendor</Nav.Link>
                </Nav.Item>
                }
                {/*TODO: `remove the comment to switch between vendor and user*/}



            </Nav>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    role: selectRole,
});
export default connect(mapStateToProps)(NavTwo);
