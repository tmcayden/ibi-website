import React from 'react';
import { useState } from 'react';

const BidRequestForm = () => {
  const [showForm, setShowForm] = useState('false');
  const form = (
    <div className="w-100 m-1 p-1 form text-center">
      <button
        className="text-center bid-form"
        onClick={() => {
          setShowForm('false');
        }}
      >
        Hide Form
      </button>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScKAttVMAfe2Uhmkx6VHktD0g-lWKDrl4GNZoUrDFN9-SBvaA/viewform?embedded=true"
        className="w-100 vh-100"
      >
        Loading…
      </iframe>
    </div>
  );
  return (
    <div>
      {showForm == 'true' ? (
        form
      ) : (
        <div className="m-2 text-center">
          <p>For estimates, please fill out our bid request form</p>
          <button
            className="text-center bid-form"
            onClick={() => {
              setShowForm('true');
            }}
          >
            Bid Request Form
          </button>
        </div>
      )}
    </div>
  );
};

export default BidRequestForm;
