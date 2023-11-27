import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Container, Nav, NavDropdown, Badge, Offcanvas } from 'react-bootstrap';
import logo from '../Assets/logo.png';


function Header() {
  const cartArray = useSelector((state) => state.cartReducer);
  console.log(cartArray);

  return (
    <Navbar collapseOnSelect expand="lg" bg="body-tertiary" variant="light" style={{ height: '60px' }}>
      <Container style={{height:'250px'}}>
        <Navbar.Brand as={Link} to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder', fontSize: '25px' }}>
          <img src={logo} style={{backgroundBlendMode:'multiply', backgroundColor: 'transparent'}} width={100} alt="" />
          HungryEats
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="d-flex align-items-center">
            <Nav.Link as={Link} to="/menu" style={{ color: 'black', fontSize: '18px', fontWeight: '500' }}>
              Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="ms-5" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
              Cart <Badge bg="secondary">{cartArray.length}</Badge>
            </Nav.Link>
            <Nav.Link as={Link} to="/kitchen" className="ms-4 bg-dark px-4 rounded" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
              Kitchen
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
