import React from 'react';
import Card from 'react-bootstrap/Card';
import HeaderComponent from './HeaderComponent';
import galleryImg from '/src/assets/IMG_9222.jpg';

const GalleryPageHeaderComponent = () => {
  return (
    <div>
      <Card>
        <div className="bg-dark bg-opacity-10">
          <Card.Img
            className="img-fluid header"
            src={galleryImg}
            alt="Card image"
          />
          <Card.ImgOverlay>
            <div className="p-1">
              <HeaderComponent />
            </div>
            <br />
            <div className="mx-auto p-4 bg-dark bg-opacity-75 d-none d-sm-block">
              <Card.Title className="fs-1 fw-bolder text-secondary"></Card.Title>
              <Card.Text className="mx-2 p-2 fs-4 fw-bold text-white text-opacity-75"></Card.Text>
              <Card.Text className="mx-2 p-2 fs-4 fw-bold text-white text-opacity-75"></Card.Text>
            </div>
          </Card.ImgOverlay>
        </div>
      </Card>
    </div>
  );
};

export default GalleryPageHeaderComponent;
