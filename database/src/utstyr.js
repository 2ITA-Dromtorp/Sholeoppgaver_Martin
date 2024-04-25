import React, { useState, useEffect } from 'react';

function UtstyrPage() {
  const [utstyrData, setUtstyrData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/utstyr')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUtstyrData(data);
      })
      .catch(error => {
        console.error('Error fetching utstyr data:', error);
      });
  }, []);

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

  const tableHeaders = ['UtstyrID', 'Kategori', 'Modell', 'Pris'];

  return (
    <div className="container">
      <h1>Utstyr</h1>
      {utstyrData.length > 0 ? (
        renderTable(utstyrData, tableHeaders)
      ) : (
        <p>Loading...</p>
      )}
      <ul>
        <li><a href="/utstyr">Utstyr</a></li>
        <li><a href="/elev">Elev</a></li>
        <li><a href="/klasser">Klasser</a></li>
        <li><a href="/utlan">Utland</a></li>
        <li><a href="/utstyr">Utstyr</a></li>
      </ul>
    </div>
  );
}

export default UtstyrPage;
