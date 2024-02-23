import React from 'react';
import aboutImage from '/src/assets/terran_mitch.png';

const AboutComponent = () => {
  return (
    <div>
      <h1 className="title">Who we are</h1>
      <div className="m-4">
        <div className="d-md-inline-block about d-none">
          <p>
            Welcome to IBI Contracting, your premier source for top-quality
            construction services! Founded by two entrepreneurs from Vernal,
            Utah, IBI Contracting brings together expertise, experience, and a
            commitment to excellence in every project we undertake.
          </p>
          <p>
            Based in the picturesque town of Vernal, Utah, IBI Contracting is
            dedicated to delivering superior results while maintaining the
            highest standards of professionalism and craftsmanship. Our roots in
            the local community provide us with a unique understanding of the
            region's needs and preferences, allowing us to tailor our services
            to exceed expectations.
          </p>
          <p>
            With a focus on efficiency, reliability, and customer satisfaction,
            IBI Contracting is your trusted partner for all your contracting
            needs. From residential renovations to commercial construction
            projects, we have the expertise and resources to bring your vision
            to life.
          </p>
          <p>
            Experience the difference with IBI Contracting – where quality meets
            affordability and excellence is our standard. Welcome to a new era
            of construction solutions with IBI Contracting.
          </p>
        </div>
        <div className="d-md-inline-block about d-none">
          <img className="about-image img-thumbnail" src={aboutImage} />
        </div>
      </div>
      <div className="m-4 d-md-none d-inline-block">
        <p>
          Welcome to IBI Contracting, your premier source for top-quality
          construction services! Founded by two entrepreneurs from Vernal, Utah,
          IBI Contracting brings together expertise, experience, and a
          commitment to excellence in every project we undertake.
        </p>
        <p>
          Based in the picturesque town of Vernal, Utah, IBI Contracting is
          dedicated to delivering superior results while maintaining the highest
          standards of professionalism and craftsmanship. Our roots in the local
          community provide us with a unique understanding of the region's needs
          and preferences, allowing us to tailor our services to exceed
          expectations.
        </p>
        <p>
          With a focus on efficiency, reliability, and customer satisfaction,
          IBI Contracting is your trusted partner for all your contracting
          needs. From residential renovations to commercial construction
          projects, we have the expertise and resources to bring your vision to
          life.
        </p>
        <p>
          Experience the difference with IBI Contracting – where quality meets
          affordability and excellence is our standard. Welcome to a new era of
          construction solutions with IBI Contracting.
        </p>
      </div>
      <div className="m-4 mt-0 d-md-none d-inline-block">
        <img className="about-image img-thumbnail" src={aboutImage} />
      </div>
    </div>
  );
};

export default AboutComponent;
