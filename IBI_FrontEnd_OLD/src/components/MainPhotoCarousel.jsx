import React from 'react';
import { Carousel } from 'react-bootstrap';
import photo2 from '/src/assets/IMG_2418.jpg';
import photo3 from '/src/assets/IMG_2963.jpg';
import photo4 from '/src/assets/IMG_3361.jpg';
import photo5 from '/src/assets/IMG_6304.jpg';

const MainPhotoCarousel = () => {
  return (
    <div className="mt-0">
      <Carousel>
        <Carousel.Item interval={5000}>
          <img src={photo2} className="center" />
          <Carousel.Caption>
            {/* <h4>Potential Caption.</h4> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img src={photo3} className="center" />
          <Carousel.Caption>
            {/* <h4>Potential Caption.</h4> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img src={photo4} className="center" />
          <Carousel.Caption>
            {/* <h4>Potential Caption.</h4> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img src={photo5} className="center" />
          <Carousel.Caption>
            {/* <h4>Potential Caption.</h4> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default MainPhotoCarousel;
