import React from 'react';
import Card from 'react-bootstrap/Card';
import HeaderComponent from './HeaderComponent';

const TestCardComponent = () => {
  return (
    <div>
      <Card>
        <div className="bg-dark">
          <Card.Img
            className="img-fluid"
            src="/src/assets/FramingPhoto.HEIC"
            alt="Card image"
          />
          <Card.ImgOverlay>
            <div className="p-1">
              <HeaderComponent />
            </div>
            <br />
            <div className="mx-auto p-4 bg-dark bg-opacity-75 d-none d-sm-block">
              <Card.Title className="fs-1 fw-bolder text-secondary">
                Integrity (noun):
              </Card.Title>
              <Card.Text className="mx-2 p-2 fs-4 fw-bold text-white text-opacity-75">
                1. The quality of being honest and having strong moral
                principles
              </Card.Text>
              <Card.Text className="mx-2 p-2 fs-4 fw-bold text-white text-opacity-75">
                2. The condition of being unified or sound in construction
              </Card.Text>
            </div>
          </Card.ImgOverlay>
        </div>
      </Card>
    </div>
  );
};

export default TestCardComponent;
