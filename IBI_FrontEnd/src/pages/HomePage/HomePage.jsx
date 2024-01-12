import React from 'react';
import MainPhotoCarousel from '../../components/MainPhotoCarousel';
import MainPageHeaderComponent from '../../components/MainPageHeaderComponent';

const HomePage = () => {
  return (
    <div>
      <MainPageHeaderComponent />
      <br />
      <MainPhotoCarousel />
      <br />
    </div>
  );
};

export default HomePage;
