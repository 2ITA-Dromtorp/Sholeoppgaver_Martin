// RegistrationForm.js

import React, { useState } from 'react';

const RegistrationForm = ({ course }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementer logikken for å sende inn skjemadata (f.eks. API-kall) her.
    console.log(`Påmelding for ${course.title} mottatt! Navn: ${name}, E-post: ${email}`);
  };

  return (
    <div>
      <h2>Påmelding for {course.title}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Navn:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          E-post:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <button type="submit">Meld deg på</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
