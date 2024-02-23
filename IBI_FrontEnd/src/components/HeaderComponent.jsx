import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo_transparent from '/src/assets/Logo_transparent.png';

function HeaderComponent() {
  return (
    <div className="bg-white bg-opacity-90">
      <Navbar expand="sm" sticky="top">
        <Container>
          <a href="/">
            <img src={Logo_transparent} href="/"></img>
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/gallery">
                <h4>Gallery</h4>
              </Nav.Link>
              <Nav.Link href="/contact">
                <h4>Contact</h4>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeaderComponent;
