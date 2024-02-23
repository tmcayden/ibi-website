import React from 'react';
import facebook from '/src/assets/facebook.png';
import instagram from '/src/assets/instagram.png';
import animatedLogo from '/src/assets/animated_logo.gif';

const ContactComponent = () => {
  return (
    <div>
      <div className="m-4">
        <div className="d-inline-block contact">
          <p>Business Hours:</p>
          <p>M-F 8-5</p>
          <p>
            Terran Harvey | <a href="tel:435-219-6300">(435)219-6300</a>
          </p>

          <p>
            Mitch Larsen | <a href="tel:435-219-6300">(435)828-3309</a>
          </p>
          <p>contracting.IBI@gmail.com</p>
          <a href="https://www.facebook.com/contracting.ibi">
            <img className="icon-facebook" src={facebook} />
          </a>
          <a href="https://www.instagram.com/ibi_contracting/">
            <img className="icon-instagram" src={instagram} />
          </a>
        </div>
        <div className="d-inline-block contact">
          <img className="contact" src={animatedLogo}></img>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
