import React from 'react';
import { Carousel } from 'react-bootstrap';

const MainPhotoCarousel = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={5000}>
          <img src="/src/assets/IMG_9222.HEIC" className="carousel center" />
          <Carousel.Caption>
            <h4>Potential Caption.</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img src="/src/assets/IMG_2418.JPG" className="carousel center" />
          <Carousel.Caption>
            <h4>Potential Caption.</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img src="/src/assets/IMG_2963.JPG" className="carousel center" />
          <Carousel.Caption>
            <h4>Potential Caption.</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img src="/src/assets/IMG_3361.JPG" className="carousel center" />
          <Carousel.Caption>
            <h4>Potential Caption.</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img src="/src/assets/IMG_6304.JPG" className="carousel center" />
          <Carousel.Caption>
            <h4>Potential Caption.</h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default MainPhotoCarousel;
