import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function HeaderComponent() {
  return (
    <div className="bg-white bg-opacity-50">
      <Navbar expand="sm" sticky="top">
        <Container>
          <a href="/">
            <img src="/src/assets/Logo_transparent.png" href="/"></img>
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#gallery">Gallery</Nav.Link>
              <Nav.Link href="#About">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeaderComponent;
