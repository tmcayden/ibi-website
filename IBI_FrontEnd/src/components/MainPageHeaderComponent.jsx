import React from 'react';
import Container from 'react-bootstrap/Container';

const MainPageHeaderComponent = () => {
  return (
    <div className="main-background d-flex align-items-center justify-content-center">
      <div className="text-center position-relative">
        <div className="overlay">
          <h1 className="mb-4">Built with Integrity</h1>
        </div>
      </div>
    </div>
  );
};

export default MainPageHeaderComponent;
