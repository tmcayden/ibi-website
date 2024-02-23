import React from 'react';
import GalleryPageHeaderComponent from '../../components/GalleryPageHeaderComponent';
import Portfolio from '../../components/Portfolio';
import ContactComponent from '../../components/ContactComponent';

const GalleryPage = () => {
  return (
    <div className="main-div body">
      <GalleryPageHeaderComponent />
      <br />
      <Portfolio />
      <br />
      <hr />
      <ContactComponent />
    </div>
  );
};

export default GalleryPage;
