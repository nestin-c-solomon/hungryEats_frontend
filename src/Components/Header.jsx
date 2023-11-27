import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../Assets/logo.png';
import { Navbar, Nav, Container, Badge, Button, Form, Offcanvas } from 'react-bootstrap';

function Header() {
  const cartArray = useSelector((state) => state.cartReducer);
  console.log(cartArray);

  return (
    <>
      {['sm'].map((expand, index) => (
        <Navbar key={expand} expand={expand} className= "bg-body-tertiary mb-3">
          <Container>
            <Navbar.Brand as={Link} to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder', fontSize: '25px' }}>
              <img src={logo} style={{ backgroundBlendMode: 'multiply', backgroundColor: 'transparent' }} width={75} alt="" />
              HungryEats
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <img src={logo} style={{ backgroundBlendMode: 'multiply', backgroundColor: 'transparent' }} width={50} alt="" />
              HungryEats
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 text-sm-center">
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
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
