import React from 'react'
import {Navbar, Nav } from 'react-bootstrap'

const Header = () => {



    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Nimap Infotech Task</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
           
          </Nav>
          <Nav>
            <Nav.Link href="/add_product">Add Product</Nav.Link>
            <Nav.Link href="/category">Category</Nav.Link>               
          </Nav>
         
        </Navbar.Collapse>
      </Navbar>
    )
}

export default Header
