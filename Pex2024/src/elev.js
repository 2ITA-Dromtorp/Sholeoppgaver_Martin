import React, { useState, useEffect } from 'react';
// import Outlet from './Outlet';
// import { Outlet } from 'react-router-dom';
import './elevStyles.css'; // Import the CSS file

//console log something


function ElevPage() {

  const [elevData, setElevData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/elev')
      .then(response => response.json())
      .then(data => {
        setElevData(data);
        
      })
      .catch(error => {
        console.error('Error fetching elev data:', error);
      });
  }, [onloadstart]);

  const tableHeaders = ['ID', 'Fornavn', 'Etternavn', 'Klasse', 'Telefon', 'Telefon foresatte', 'Lærer'];

  const renderTable = (data, tableHeaders) => {
    return (
      <table>
        <thead>
          <tr>
            {tableHeaders.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };



  return (
    <div className="container">
      <h1>Elev</h1>
      {elevData.length > 0 ? (
        renderTable(elevData, tableHeaders)
      ) : (
        <p>drep deg selv</p>
      )}
     
    </div>
     
  );

}



export default ElevPage;
