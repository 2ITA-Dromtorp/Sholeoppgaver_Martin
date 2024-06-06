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
  port: 3306,
  connectionLimit: 100,

};

app.use(dbMiddleware);


async function dbMiddleware(req, res, next) {
  try {
    req.dbConnection = await pool.getConnection();
    next();
  } catch (err) {
    console.error('Failed to get a database connection!', err);
    res.status(500).send('Internal Server Error');
  }
}

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

// Denne delen av koden håndterer POST-forespørselen til "/innlevering"
// Den oppdaterer "Tilgjengelighet"-feltet for den valgte utstyrstilgangen i databasen

app.post("/innlevering", async (req, res) => {
  // Hent "bookedEquipment"-verdien fra requestbody
  let bookedEquipment = req.body.bookedEquipment;

  // Opprette oppdateringsforespørselen
  const updateQuery = 'UPDATE utstyr SET Tilgjengelighet = 0 WHERE utstyrsID = ?';
  const updateValues = [bookedEquipment];

  // Kjør oppdateringsforespørselen mot databasen
  console.log('Kjører oppdateringsforespørselen:', updateQuery, updateValues);
  let [updateResult] = await req.dbConnection.query(updateQuery, updateValues);
  console.log('Resultat av oppdatering:', updateResult);

  // Send respons til klienten
  res.send("Laanet er godkjent");
});


// Denne delen av koden håndterer POST-forespørselen til "/laan"
// Den oppdaterer "Tilgjengelighet"-feltet for den valgte utstyrstilgangen i databasen

app.post("/laan", async (req, res) => {
  // Hent "bookedEquipment"-verdien fra requestbody
  let bookedEquipment = req.body.bookedEquipment;

  // Opprette oppdateringsforespørselen
  const updateQuery = 'UPDATE utstyr SET Tilgjengelighet = 1 WHERE utstyrsID = ?';
  const updateValues = [bookedEquipment];

  // Kjør oppdateringsforespørselen mot databasen
  console.log('Kjører oppdateringsforespørselen:', updateQuery, updateValues);
  let [updateResult] = await req.dbConnection.query(updateQuery, updateValues);
  console.log('Resultat av oppdatering:', updateResult);

  // Send respons til klienten
  res.send("Laanet er godkjent");
  // Sender forespørsel og venter på svar fra serveren/backenden.
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});