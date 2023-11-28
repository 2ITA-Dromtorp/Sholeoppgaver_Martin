// FormPopup.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FormPopup.css';

function FormPopup({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    // Add form fields as needed
    name: '',
    email: '',
    // Add more fields if necessary
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data if needed
    // Call the onSubmit prop with the form data
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="form-popup">
      <span className="close-button" onClick={onClose}>&times;</span>
      <h2>Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

        {/* Add more form fields as needed */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

FormPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormPopup;
