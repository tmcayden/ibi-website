import React from 'react';
import Card from 'react-bootstrap/Card';
import HeaderComponent from './HeaderComponent';
import galleryImg from '/src/assets/IMG_9222.jpg';

const GalleryPageHeaderComponent = () => {
  return (
    <div className="bg-dark bg-opacity-10">
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
              <br />
              <div className="mt-5 mx-auto p-4 bg-dark bg-opacity-75 d-none d-sm-block">
                <Card.Title className="fs-1 fw-bolder text-secondary text-center">
                  Find your next project
                </Card.Title>
                <Card.Text className="mx-2 p-2 fs-4 fw-bold text-white text-opacity-75 text-center">
                  Let us handle the rest
                </Card.Text>
              </div>
            </Card.ImgOverlay>
          </div>
        </Card>
      </div>
      <div className="m-0 mt-2 definition p-4 d-block d-sm-none">
        <h1 className="fs-1 fw-bolder text-black text-opacity-75">
          Find your next project
        </h1>
        <p className="mx-2 p-2 fs-4 fw-bold text-black text-opacity-75">
          Let us handle the rest
        </p>
      </div>
    </div>
  );
};

export default GalleryPageHeaderComponent;
