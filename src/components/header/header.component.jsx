import './header.styles.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './header.styles.scss'

const Header = () => (
        <Navbar fluid="true" collapseOnSelect fixed="top" expand='lg' style={{backgroundImage: 'linear-gradient(90deg, #833ab4 0%, #fd1d87 35%, #fcb045 100%)'}}>
            <Navbar.Brand href="#" style={{color : 'white'}}>MULTI VENDOR LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="#" style={{color : 'white'}}>SHOP</Nav.Link>
                <Nav.Link href="#" style={{color : 'white'}}>VENDOR LIST</Nav.Link>
                <NavDropdown title="CATEGORIES" id="collasible-nav-dropdown" style={{color : 'white'}}>
                    <NavDropdown.Item href="#">Women</NavDropdown.Item>
                    <NavDropdown.Item href="#">Men</NavDropdown.Item>
                    <NavDropdown.Item href="#">Home</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#">Garden</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                <Nav.Link href="#" style={{color : 'white'}}>CART(4)</Nav.Link>
                <Nav.Link eventKey={2} href="#" style={{color : 'white'}}>
                    LOGIN
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);
export default Header;
