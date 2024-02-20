import React from 'react';
import Card from 'react-bootstrap/Card';
import HeaderComponent from './HeaderComponent';
import FramingPhoto from '/src/assets/FramingPhoto.jpg';

const MainPageHeaderComponent = () => {
  return (
    <div>
      <Card>
        <div className="bg-dark bg-opacity-10">
          <Card.Img
            className="img-fluid header"
            src={FramingPhoto}
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
      <div className="definition mt-2 mb-0 p-4 bg-opacity-75 d-block d-sm-none">
        <h1 className="fs-1 fw-bolder text-black text-opacity-75">
          Integrity (noun):
        </h1>
        <p className="mx-2 p-2 fs-4 fw-bold text-black text-opacity-75">
          1. The quality of being honest and having strong moral principles
        </p>
        <p className="mx-2 p-2 fs-4 fw-bold text-black text-opacity-75">
          2. The condition of being unified or sound in construction
        </p>
      </div>
    </div>
  );
};

export default MainPageHeaderComponent;
