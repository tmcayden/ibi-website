import React from 'react';
import MainPhotoCarousel from '../../components/MainPhotoCarousel';
import MainPageHeaderComponent from '../../components/MainPageHeaderComponent';
import AboutComponent from '../../components/AboutComponent';

const HomePage = () => {
  return (
    <div>
      <MainPageHeaderComponent />
      <br />
      <MainPhotoCarousel />
      <br />
      <AboutComponent />
    </div>
  );
};

export default HomePage;
