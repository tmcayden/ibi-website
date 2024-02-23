import React from 'react';
import Card from 'react-bootstrap/Card';
import HeaderComponent from './HeaderComponent';
import FramingPhoto from '/src/assets/FramingPhoto.jpg';

const ContactPageHeaderComponent = () => {
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
            <div className="mx-auto p-4 bg-dark bg-opacity-75 d-none d-sm-block text-center">
              <Card.Title className="fs-1 fw-bolder text-secondary">
                Bring your dreams into reality
              </Card.Title>
              <Card.Text className="mx-2 p-2 fs-4 fw-bold text-white text-opacity-75">
                Reach out to us to get started
              </Card.Text>
            </div>
          </Card.ImgOverlay>
        </div>
      </Card>
      <div className="m-2 mb-0 definition p-4 d-block d-sm-none text-center">
        <h1 className="fs-1 fw-bolder text-black text-opacity-75">
          Let us help bring your dreams into reality
        </h1>
        <p className="fs-4 fw-bold text-black text-opacity-75">
          Reach out to us to get started
        </p>
      </div>
    </div>
  );
};

export default ContactPageHeaderComponent;
