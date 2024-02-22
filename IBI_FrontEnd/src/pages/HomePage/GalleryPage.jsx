import React from 'react';
import GalleryPageHeaderComponent from '../../components/GalleryPageHeaderComponent';
import Portfolio from '../../components/Portfolio';
import ContactComponent from '../../components/ContactComponent';

const GalleryPage = () => {
  return (
    <body className="main-div body">
      <GalleryPageHeaderComponent />
      <br />
      <Portfolio />
      <br />
      <ContactComponent id="contact" />
      <br />
    </body>
  );
};

export default GalleryPage;
