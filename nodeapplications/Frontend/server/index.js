// index.js

const express = require('express');
const app = express();
const PORT = 3001;
const mysql = require('mysql2');
const cors = require('cors');

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

const dbConfig = {
  user: 'Martin',
  password: 'Newscreen3',
  database: 'dromtorp',
  host: 'localhost',
  port: 3306,
};

const connection = mysql.createConnection(dbConfig);
connection.connect(function (err) {
    if (err) {
        console.error('Connection failed!');
        throw err;
    }
    console.log('Connected to MySQL database!');
});

// Endpoint to handle updates
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { columnName, updatedValue } = req.body;

  // Check if required parameters are provided
  if (!columnName || !updatedValue) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  const sql = `UPDATE elev SET ${columnName} = ? WHERE id = ?`;
  const values = [updatedValue, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ message: 'Update successful', affectedRows: result.affectedRows });
  });
});

// Your existing endpoint for fetching data
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM elev';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log(JSON.stringify(result));
    console.log(result);
    res.json(result); // Send as JSON
  });
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
