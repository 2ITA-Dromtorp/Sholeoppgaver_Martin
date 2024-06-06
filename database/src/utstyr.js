import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './utstyrStyles.css'; // Import the CSS file

function UtstyrPage() {
  const [utstyrData, setUtstyrData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/utstyr')
      .then(response => response.json())
      .then(data => {
        
        setUtstyrData(data);
        // Sender en get request til back-end serveren og henter ut alle utstyr. Så setter den utstyrsdata til å være lik response.json.
      })
      .catch(error => {
        console.error('Error fetching utstyr data:', error);
        
      });
  }, []);

  const toggleColor = (index) => {
    const updatedData = [...utstyrData];
    updatedData[index].color = updatedData[index].color === 'red' ? 'green' : 'red';
    updatedData[index].available = !updatedData[index].available; // Toggle availability
    setUtstyrData(updatedData);
  };

  function laan(e){
    let bookedEquipment = e.target.id
    axios.post('/laan', {"bookedEquipment":bookedEquipment})
    .then((response) => {
        window.location.reload();
        // setIsBooked(true)
        
    })
  } 

  function lever(e){
    let bookedEquipment = e.target.id
    axios.post('/innlevering', {"bookedEquipment":bookedEquipment})
    .then((response) => {
        window.location.reload();
        // setIsBooked(false)
    })

  }

  // const renderTable = (data, tableHeaders) => {
  //   return (
  //     <table>
  //       <thead>
  //         <tr>
  //           {tableHeaders.map(header => (
  //             <th key={header}>{header}</th>
  //           ))}
  //           <th>Status</th> {/* New column for buttons */}
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {data.map((row, index) => (
  //           <tr key={index} style={{ backgroundColor: row.color }}>
  //             {Object.values(row).map((value, idx) => (
  //               <>
  //               <td key={idx}>{value}</td>

  //             <td>
  //               {/* Toggle color buttons */}
  //               <button id={} onClick={() => toggleColor(index)} disabled={!row.available}>Utlånt</button>
  //               <button onClick={() => toggleColor(index)} disabled={row.available}>Ledig</button>
  //             </td>
  //             </>
  //             ))}
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   );
  // };

  // const tableHeaders = ['UtstyrID', 'Kategori', 'Modell', 'Pris'];



  return (
    // <div className="container">
    //   <h1>Utstyr</h1>
    //   <Link to="/login">Login</Link>
    //   {utstyrData.length > 0 ? (
    //     renderTable(utstyrData, tableHeaders)
    //   ) : (
    //     <p>KYS</p>
    //   )}
    // </div>

   <table className='styled_table'>
     <thead>
       <tr>
         <th>UtstyrsID</th>
         <th>Kategori</th>
         <th>Modell</th>
         <th>Status</th>
       </tr>
     </thead>
     <tbody>
       {/* Renderer utstyrData i en tabell, rad for rad. */}
       {utstyrData.map((utstyr) => (
         <tr key={utstyr.utstyrsID}>
           <td>{utstyr.utstyrsID}</td>
           <td>{utstyr.Kategori}</td>
           <td>{utstyr.Modell}</td>
           <td>{utstyr.Tilgjengelighet}</td>
           {utstyr.Tilgjengelighet > 0 ? (
             // Vis "Avbestill"-knappen hvis Tilgjengelighet er større enn 0
             <button id={utstyr.utstyrsID} onClick={(e) => lever(e)}>
               Avbestill
             </button>
           ) : (
             // Vis "Bestill"-knappen hvis Tilgjengelighet er mindre enn eller lik 0
             <button id={utstyr.utstyrsID} onClick={(e) => laan(e)}>
               Bestill
             </button>
           )}
         </tr>
       ))}
     </tbody>
   </table>
)}

export default UtstyrPage;
