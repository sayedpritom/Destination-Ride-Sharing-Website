import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeaderNavbar.css'
import logo from '../../images/Logo.png'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const HeaderNavbar = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    console.log(currentUser);
    return (
        <Container>
            <Navbar bg="none" expand="lg">
                <Navbar.Brand> <Link to="/home"> <img className="img-fluid mainLogo" src={logo} alt="" /> </Link> </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto navLinks">
                        <Link to="/home">Home</Link>
                        <Link to="/destination">Destination</Link>
                        <Link to="/blog">blog</Link>
                        <Link to="/contact">contact</Link>
                        {currentUser.email ? <Link to="/profile" id="userName">{currentUser.displayName}</Link> : <Link to="login" id="loginButton">login</Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>

    );
};

export default HeaderNavbar;