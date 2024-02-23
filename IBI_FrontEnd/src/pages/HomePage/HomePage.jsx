import React from 'react';
import MainPhotoCarousel from '../../components/MainPhotoCarousel';
import AboutComponent from '../../components/AboutComponent';
import ContactComponent from '../../components/ContactComponent';
import MainPageHeaderComponent from '../../components/MainPageHeaderComponent.jsx';

const HomePage = () => {
  return (
    <div className="main-div body">
      <MainPageHeaderComponent />
      <br />
      <MainPhotoCarousel />
      <br />
      <AboutComponent />
      <hr />
      <ContactComponent />
    </div>
  );
};

export default HomePage;
