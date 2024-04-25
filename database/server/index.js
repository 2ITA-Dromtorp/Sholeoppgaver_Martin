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
  database: 'databaseprosjekt',
  host: 'localhost',
  port: 3306
};

const pool = mysql.createPool(dbConfig);

// app.get('/all', async (req, res) => {
//   try {
//     const connection = await pool.getConnection();
//     const [erows, efields] = await connection.query('SELECT * FROM `elev`');
//     const [krows, kfields] = await connection.query('SELECT * FROM `klasser`');
//     const [urows, ufields] = await connection.query('SELECT * FROM `utstyr`');
//     connection.release();
//     res.json(rows);
//   } catch (error) {
//     console.error('Error executing SQL query:', error);
//     res.status(500).send('error fetching data from database(all)');
//   }
// });

app.get('/all', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [eresults, efields] = await connection.query('SELECT * FROM `elev`');
    const [kresults, kfields] = await connection.query('SELECT * FROM `klasser`');
    const [uresults, ufields] = await connection.query('SELECT * FROM `users`');
    const [utresults, utfields] = await connection.query('SELECT * FROM `utlan`');
    const [utsresults, utsfields] = await connection.query('SELECT * FROM `utstyr`');
    connection.release();
    res.json({ "elev": eresults, "klasser": kresults, "users": uresults, "utlan": utresults, "utstyr": utsresults });
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.get('/elev', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM `elev`');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/klasse', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM `klasser`');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).send('Internal Server Error');
  }
});

 

app.get('/utstyr', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM `utstyr`');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});