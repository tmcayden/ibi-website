import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function HeaderComponent() {
  return (
    <div className="bg-white bg-opacity-90">
      <Navbar expand="sm" sticky="top">
        <Container>
          <a href="/">
            <img src="/src/assets/Logo_transparent.png" href="/"></img>
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/gallery">
                <h4>Gallery</h4>
              </Nav.Link>
              <Nav.Link href="#About">
                <h4>About</h4>
              </Nav.Link>
              <Nav.Link href="/Contact">
                <h4>Contact Us</h4>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeaderComponent;
