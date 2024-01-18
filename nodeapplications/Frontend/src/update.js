// Update.js

import React, { useState } from 'react';
import axios from 'axios';

export default function Update() {
  const [id, setId] = useState('');
  const [columnName, setColumnName] = useState('');
  const [updatedValue, setUpdatedValue] = useState('');

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/update/${id}`, {
        columnName,
        updatedValue,
      });

      // Handle success or provide feedback to the user
      console.log('Update successful');
    } catch (error) {
      // Handle errors or provide feedback to the user
      console.error('Update failed', error);
    }
  };

  return (
    <div className='UpdateForm'>
      <div>
        <label>ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </div>
      <div>
        <label>Column Name:</label>
        <input type="text" value={columnName} onChange={(e) => setColumnName(e.target.value)} />
      </div>
      <div>
        <label>Updated Value:</label>
        <input type="text" value={updatedValue} onChange={(e) => setUpdatedValue(e.target.value)} />
      </div>
      <button className='Button' onClick={handleUpdate}>Update</button>
    </div>
  );
}
