import React from 'react';
import MainPhotoCarousel from '../../components/MainPhotoCarousel';
import TestCardComponent from '../../components/TestCardComponent';
import Portfolio from '../../components/Portfolio';

const HomePage = () => {
  return (
    <div>
      <div>
        <TestCardComponent />
      </div>
      <br />
      <div>
        <MainPhotoCarousel />
      </div>
      <div>
        <Portfolio />
      </div>
      <br />
    </div>
  );
};

export default HomePage;
