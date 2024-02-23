import React from 'react';
import facebook from '/src/assets/facebook.png';
import instagram from '/src/assets/instagram.png';
import animatedLogo from '/src/assets/animated_logo.gif';

const ContactComponent = () => {
  return (
    <div className="mb-0">
      <div className="m-4">
        <div className="d-sm-inline-block contact d-none text-center p-4">
          <p>Business Hours:</p>
          <p>Monday-Friday 8-5</p>
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
        <div className="d-sm-inline-block d-none w-50 text-center">
          <img className="p-1 w-100 contact-logo" src={animatedLogo}></img>
        </div>
        <div className="text-center">
          <div className="d-sm-none d-inline-block">
            <p>Business Hours:</p>
            <p>Monday-Friday 8-5</p>
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
        </div>
        <div className="ml-auto d-sm-none d-inline-block text-center">
          <img className="contact " src={animatedLogo}></img>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
