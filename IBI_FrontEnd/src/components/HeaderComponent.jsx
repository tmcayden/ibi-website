import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function HeaderComponent() {
  return (
    <Navbar bg="dark" expand="lg" className="bg-body-tertiary" collapseOnSelect>
      <Container>
        <a href="/">
          <img src="/src/assets/Logo_transparent.png" href="/"></img>
        </a>
        <Navbar.Brand href="/">Integrity Builders Inc.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/gallery">Gallery</Nav.Link>
            <Nav.Link href="/About">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;
