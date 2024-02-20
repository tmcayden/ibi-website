import React from 'react';
import photo1 from '/src/assets/IMG_2250.jpg';
import photo2 from '/src/assets/IMG_2418.jpg';
import photo3 from '/src/assets/IMG_2963.jpg';
import photo4 from '/src/assets/IMG_3361.jpg';
import photo5 from '/src/assets/IMG_6304.jpg';
import photo6 from '/src/assets/IMG_9222.jpg';
import photo7 from '/src/assets/IMG_9227.jpg';

const Portfolio = () => {
  return (
    <div className="bg-dark bg-opacity-10">
      <div id="gallery">
        <br />
        <h2 className="fs-1 fw-bold text-center bg-primary bg-opacity-50">
          Gallery
        </h2>
      </div>
      <div className="p-2 align-items-center">
        <img className="mx-2 img-thumbnail gallery" src={photo1}></img>
        <img className="mx-2 img-thumbnail gallery" src={photo2}></img>
        <img className="mx-2 img-thumbnail gallery" src={photo3}></img>
        <img className="mx-2 img-thumbnail gallery" src={photo4}></img>
        <img className="mx-2 img-thumbnail gallery" src={photo5}></img>
        <img className="mx-2 img-thumbnail gallery" src={photo6}></img>
        <img className="mx-2 img-thumbnail gallery" src={photo7}></img>
      </div>
    </div>
  );
};

export default Portfolio;
