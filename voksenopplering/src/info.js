import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import json from './fag';
import FormPopup from './FormPopup';
import './FormPopup.css';

const Info = () => {
  const { fag } = useParams();
  let jsonIndex;

  for (let i in json.kursinfo) {
    if (json.kursinfo[i].kursnavn.toLowerCase() === fag.toLowerCase()) {
      jsonIndex = i;
    }
  }

  const infoContainerStyle = {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    margin: '20px',
  };

  const titleStyle = {
    color: '#333',
    fontSize: '2em',
    marginBottom: '10px',
  };

  const boxStyle = {
    border: '2px solid #3498db',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
  };

  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (formData) => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div style={infoContainerStyle}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div style={boxStyle}>
        <h1 style={titleStyle}>{json.kursinfo[jsonIndex].kursnavn}</h1>
        <p>{json.kursinfo[jsonIndex].info}</p>
        <button
          style={buttonStyle}
          onClick={() => setShowForm(true)}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#2980b9')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#3498db')}
        >
          Open Form
        </button>
      </div>
      {showForm && <FormPopup onClose={() => setShowForm(true)} onSubmit={handleFormSubmit} />}
    </div>
  );
};

export default Info;
