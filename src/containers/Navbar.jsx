import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown, NavItem} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
import logo from '../vigg.png';
import './Navbar.css';


const navbar = () => (
    <Navbar fluid="true" collapseOnSelect expand="lg" fixed="top" className="navbar-color">
        <Navbar.Brand>
            <Link to="/">
                <img alt="Vigg Icon" src={logo} className="navbar-brand"/>
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse className="justify-content-center">
            <Nav fill variant="tabs">
                <NavItem>
                    <Nav.Link href="/about-us" className="nav-item" style={{color: 'white', background: 'transparent'}}>
                        ABOUT US
                    </Nav.Link>
                </NavItem>
                <NavDropdown title="SHOP" id="dropdown">
                    <LinkContainer to="/shop/male">
                        <NavDropdown.Item>Male</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/shop/female">
                        <NavDropdown.Item>Female</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/shop/kid">
                        <NavDropdown.Item color="white">Kid</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>

                <NavDropdown title="SELL WITH US" id="dropdown">
                    <NavDropdown.Item>How To Sell</NavDropdown.Item>
                    <NavDropdown.Item>Sell Now!</NavDropdown.Item>
                </NavDropdown>

            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default navbar