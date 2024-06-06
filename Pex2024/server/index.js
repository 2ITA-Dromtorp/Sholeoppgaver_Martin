const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(express.static('build'));
app.use(express.json());
app.use(cors());

const port = 3001;

const dbConfig = {
  user: 'root',
  password: '',
  database: 'skolekantine', // Updated database name
  host: 'localhost',
  port: 3306,
  connectionLimit: 100,
};

const pool = mysql.createPool(dbConfig);

// Middleware for database connection
async function dbMiddleware(req, res, next) {
  try {
    req.dbConnection = await pool.getConnection();
    next();
  } catch (err) {
    console.error('Failed to get a database connection!', err);
    res.status(500).send('Internal Server Error');
  }
}

app.use(dbMiddleware);

// Get all data from mat table
app.get('/mat', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM `mat`');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Place an order
app.post('/bestill', async (req, res) => {
  const { orderedItem } = req.body;

  const updateQuery = 'UPDATE mat SET tilgjengelighet = tilgjengelighet - 1 WHERE matID = ? AND tilgjengelighet > 0';
  const updateValues = [orderedItem];
  console.log('Executing query:', updateQuery, updateValues);

  try {
    const [updateResult] = await req.dbConnection.query(updateQuery, updateValues);
    console.log('Result:', updateResult);

    if (updateResult.affectedRows > 0) {
      res.send("Bestillingen er godkjent");
    } else {
      res.status(400).send("Mat ikke tilgjengelig eller ugyldig matID");
    }
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Cancel an order
app.post('/avbestill', async (req, res) => {
  const { orderedItem } = req.body;

  const updateQuery = 'UPDATE mat SET tilgjengelighet = tilgjengelighet + 1 WHERE matID = ?';
  const updateValues = [orderedItem];
  console.log('Executing query:', updateQuery, updateValues);

  try {
    const [updateResult] = await req.dbConnection.query(updateQuery, updateValues);
    console.log('Result:', updateResult);

    if (updateResult.affectedRows > 0) {
      res.send("Avbestillingen er godkjent");
    } else {
      res.status(400).send("Ugyldig matID");
    }
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
