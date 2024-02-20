import React from 'react';
import { Container } from 'react-bootstrap';

const AboutComponent = () => {
  return (
    <Container className="bg-light">
      <h1 className="text-center bg-dark bg-opacity-25">Who we are</h1>
      <div>
        <p className="d-inline-block mg-2 w-50 ph-">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi fuga
          voluptates consequatur similique ea sit, laboriosam praesentium in
          incidunt fugit unde recusandae numquam, voluptatem, itaque cupiditate
          temporibus iste voluptatum vitae! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Veritatis temporibus quae
          necessitatibus nam soluta officia saepe eaque, deleniti voluptates.
          Sed odit vero beatae voluptates id dolorum. Consectetur sint expedita
          dolore!
        </p>
        <img
          className="about img-fluid img-thumbnail d-inline w-50"
          src="/src/assets/animated_logo.gif"
        ></img>
      </div>
    </Container>
  );
};

export default AboutComponent;
