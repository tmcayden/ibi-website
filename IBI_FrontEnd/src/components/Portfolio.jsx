import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import photo1 from '/src/assets/IMG_2250.jpg';
import photo2 from '/src/assets/IMG_2418.jpg';
import photo3 from '/src/assets/IMG_2963.jpg';
import photo4 from '/src/assets/IMG_3361.jpg';
import photo5 from '/src/assets/IMG_6304.jpg';
import photo6 from '/src/assets/IMG_9222.jpg';
import photo7 from '/src/assets/IMG_9227.jpg';

const Portfolio = () => {
  const [section, setSection] = useState('Select Category');

  return (
    <div className="">
      <div id="gallery">
        <br />
        <h2 className="title ">Gallery</h2>
      </div>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item className="d-none d-md-block">
          <Nav.Link eventKey="link-1">Bathroom Remodels</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-none d-md-block">
          <Nav.Link eventKey="link-2">Concrete</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-none d-md-block">
          <Nav.Link eventKey="link-3">Drywall</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-none d-md-block">
          <Nav.Link eventKey="link-4">Flooring</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-none d-md-block">
          <Nav.Link eventKey="link-5">Framing</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-none d-md-block">
          <Nav.Link eventKey="link-6">Insulated Concrete Forms</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-none d-md-block">
          <Nav.Link eventKey="link-7">Painting</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-none d-md-block">
          <Nav.Link eventKey="link-8">All Photos</Nav.Link>
        </Nav.Item>
        <NavDropdown
          title={section}
          id="nav-dropdown"
          className="d-block d-md-none"
        >
          <NavDropdown.Item
            eventKey="link-1"
            onClick={() => {
              setSection('Bathroom Remodels');
            }}
          >
            Bathroom remodels
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="link-2"
            onClick={() => {
              setSection('Concrete');
            }}
          >
            Concrete
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="link-3"
            onClick={() => {
              setSection('Drywall');
            }}
          >
            Drywall
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="link-4"
            onClick={() => {
              setSection('Flooring');
            }}
          >
            Flooring
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="link-5"
            onClick={() => {
              setSection('Framing');
            }}
          >
            Framing
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="link-6"
            onClick={() => {
              setSection('Insulated Concrete Forms');
            }}
          >
            Insulated Concrete Forms
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="link-7"
            onClick={() => {
              setSection('Painting');
            }}
          >
            Painting
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            eventKey="link-8"
            onClick={() => {
              setSection('All Photos');
            }}
          >
            All Photos
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <div className="p-2">
        <img className="mx-2 img-thumbnail gallery" src={photo1}></img>
        <img className="mx-2 img-thumbnail gallery" src={photo2}></img>
        <img className="mx-2 img-thumbnail gallery" src={photo3}></img>
        <img className="mx-2 img-thumbnail gallery" src={photo4}></img>
        <img className="mx-2 img-thumbnail gallery" src={photo5}></img>
        <img className="mx-2 img-thumbnail gallery" src={photo6}></img>
        <img className="mx-2 img-thumbnail gallery" src={photo7}></img>
      </div>
    </div>
  );
};

export default Portfolio;
