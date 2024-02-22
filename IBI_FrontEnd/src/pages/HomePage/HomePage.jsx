import React from 'react';
import MainPhotoCarousel from '../../components/MainPhotoCarousel';
import MainPageHeaderComponent from '../../components/MainPageHeaderComponent';
import AboutComponent from '../../components/AboutComponent';
import ContactComponent from '../../components/ContactComponent';

const HomePage = () => {
  return (
    <body className="main-div body">
      <MainPageHeaderComponent />
      <br />
      <MainPhotoCarousel />
      <br />
      <AboutComponent />
      <br />
      <ContactComponent />
      <br />
    </body>
  );
};

export default HomePage;
