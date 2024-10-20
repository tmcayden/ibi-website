import React from 'react';
import ContactComponent from '../../components/ContactComponent';
import BidRequestForm from '../../components/BidRequestForm.jsx';
import ContactPageHeaderComponent from '../../components/ContactPageHeaderComponent.jsx';

const ContactPage = () => {
  return (
    <div className="main-div body">
      <ContactPageHeaderComponent />
      <div></div>
      <BidRequestForm />
      <hr />
      <ContactComponent />
    </div>
  );
};

export default ContactPage;
