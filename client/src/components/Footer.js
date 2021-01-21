import React from 'react'
import {Navbar, Nav } from 'react-bootstrap'

const Footer = () => {



    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
       
          <Nav className="m-auto">
            <Nav.Link >All rights reserved</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default Footer
