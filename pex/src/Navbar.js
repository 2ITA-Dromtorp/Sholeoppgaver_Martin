import React from 'react';
import './Navbar.css';

const BottomNavbar = () => {
  // Anta at dette er kontaktopplysningene for personer i selskapet
  const contactInfo = [
    { name: 'Anders Olsen', email: ' anders.olsen@example.com', phone: '+47 987 654 321' },
    { name: 'Emma Johansen', email: 'emma.johansen@example.com', phone: '+47 123 456 789' },
    // Legg til flere kontakter etter behov
  ];

  return (
    <div className='container'>
    <div className="bottom-navbar">
      <h2>Kontaktinfo</h2>
      <ul>
        {contactInfo.map((contact, index) => (
          <li key={index}>
            <strong>{contact.name}</strong>
            <p>Email: {contact.email}</p>
            <p>Telefon: {contact.phone}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default BottomNavbar;
