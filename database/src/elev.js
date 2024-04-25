import React, { useState, useEffect } from 'react';
// import Outlet from './Outlet';

function ElevPage() {
  const [elevData, setElevData] = useState([]);

  useEffect(() => {
    fetch('/elev')
      .then(response => response.json())
      .then(data => {
        setElevData(data);
      })
      .catch(error => {
        console.error('Error fetching elev data:', error);
      });
  }, []);

  const tableHeaders = ['ID', 'Fornavn', 'Etternavn', 'Klasse', 'Telefon', 'Telefon foresatte', 'Lærer'];

  return <Outlet pageTitle="Elev Data" tableHeaders={tableHeaders} data={elevData} />;
}

export default ElevPage;
