import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';

function Header() {

  const cartArray = useSelector((state)=>state.cartReducer)
  console.log(cartArray);

  return (
    
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" style={{height:'60px'}}>
    <Container>
      <Navbar.Brand href="/">
        <Link to={'/'} style={{textDecoration:'none',color:'black',fontWeight:'bolder',fontSize:'25px'}}>
          HungryEats
          </Link>
          </Navbar.Brand>
        
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        </Nav>
        <Nav className='d-flex align-items-center'>
          {/* <Nav.Link href="./menu" style={{color:'black',fontSize:'18px',fontWeight:'500'}}>
            Menu
            </Nav.Link> */}
            <Link style={{textDecoration:'none', color:'black',fontWeight:'bold'}} to={'/menu'}>Menu</Link>
            
          <Link to={'/cart'} className='ms-5' style={{textDecoration:'none', color:'black',fontWeight:'bold'}}>Cart <Badge bg="secondary">{cartArray.length}</Badge> </Link>
          <Link className='ms-4 bg-dark px-4 rounded' style={{textDecoration:'none', color:'white',fontWeight:'bold'}} to={'/kitchen'}>Kitchen</Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
      
  )
}

export default Header