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
  password: 'root',
  database: 'examen2024',
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

// Get all data from products table
app.get('/mat', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM products');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Place an order from cart
app.post('/bestill', async (req, res) => {
  const { orders } = req.body;

  try {
    for (const order of orders) {
      const { produktID, bestiller, sum, dato } = order;
      const updateQuery = 'UPDATE products SET antall = antall - 1 WHERE ID = ? AND antall > 0';
      const insertOrderQuery = 'INSERT INTO bestillinger (produktID, bestiller, sum, dato) VALUES (?, ?, ?, ?)';
      
      const [updateResult] = await req.dbConnection.query(updateQuery, [produktID]);
      if (updateResult.affectedRows > 0) {
        await req.dbConnection.query(insertOrderQuery, [produktID, bestiller, sum, dato]);
      } else {
        return res.status(400).send(`ProduktID ${produktID} ikke tilgjengelig eller ugyldig.`);
      }
    }
    res.send("Bestillingen er godkjent");
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete an order
app.delete('/slett-bestilling', async (req, res) => {
  const { produktID, bestiller, dato } = req.body;

  try {
    const deleteQuery = 'DELETE FROM bestillinger WHERE produktID = ? AND bestiller = ? AND dato = ?';
    const [deleteResult] = await req.dbConnection.query(deleteQuery, [produktID, bestiller, dato]);

    if (deleteResult.affectedRows > 0) {
      res.send("Bestillingen er slettet");
    } else {
      res.status(400).send("Ugyldig bestillingsdetaljer");
    }
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/handlekurv', async (req, res) => {
  const b = req.body;
  const data = b.data;

  if (!Array.isArray(data)) {
    return res.status(400).send('Invalid data format: Expected an array');
  }

  const arrayOfDifferentNumbers = [];
  for (let i = 0; i < data.length; i++) {
    if (i > 0 && data[i] === data[i - 1]) continue;
    arrayOfDifferentNumbers.push(parseInt(data[i]));
  }

  let sql = 'SELECT * FROM products';
  let [result] = await req.dbConnection.query(sql);

  let result2array = [];
  for (let i = 0; i < arrayOfDifferentNumbers.length; i++) {
    sql = `SELECT * FROM products WHERE ID = ${arrayOfDifferentNumbers[i]}`;
    const [result2] = await req.dbConnection.query(sql);
    result2array.push(result2[0]);
  }

  if (result2array.length > 0) {
    res.send(result2array);
  } else {
    res.send("Ingen produkter i kurven");
  }
});

app.post('/betal', async (req, res) => {
  try {
    const b = req.body;
    const data = b.data;
    const bedriftsNavn = b.bedriftsNavn
    const fornavn = b.fornavn
    const etternavn = b.etternavn
    const epost = b.epost
    const tlf = b.tlf
    const betaling = b.tlf
    const firmaadresse = b.firmaadresse
    const leveringssted = b.leveringssted

    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).send("Ingen produkter sendt med forespørselen.");
    }

    const produkter = JSON.stringify(data);

    if (!epost) {
      return res.status(400).send("E-postadresse er påkrevd.");
    }

    const pris = b.pris;  // Ensure pris is defined here
    if (typeof pris !== 'number' || pris <= 0) {
      return res.status(400).send("Ugyldig pris oppgitt.");
    }

    const dato = new Date();
    const options = {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    };
    const formattedDate = dato.toLocaleString('en-GB', options).replace(',', '');

    let bestillingsQuery = `INSERT INTO bestillinger (produktID, sum, dato, bedriftsNavn, fornavn, etternavn, epost, tlf, betaling, firmaadresse, leveringssted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await req.dbConnection.query(bestillingsQuery, [produkter, pris, formattedDate, bedriftsNavn, fornavn, etternavn, epost, tlf, betaling, firmaadresse, leveringssted]);

    if (!result) {
      throw new Error('Bestillingen ble ikke registrert i databasen.');
    }

    let nummerSjekkQuery = `SELECT MAX(bestillingsNummer) AS maxID FROM bestillinger`;
    const [rows] = await req.dbConnection.query(nummerSjekkQuery);
    const bestillingsNummer = rows[0].maxID;
    console.log(bestillingsNummer)
    


    if (!bestillingsNummer) {
      throw new Error('Kunne ikke hente bestillingsNummer fra databasen.');
    }

    for (let i = 0; i < data.length; i++) {
      let sql = `UPDATE products SET antall = antall - 1 WHERE ID = ${data[i]}`;
      const updateResult = await req.dbConnection.query(sql);
      if (updateResult.affectedRows === 0) {
        throw new Error(`Oppdatering av produktID ${data[i]} feilet, ingen rader påvirket.`);
      }
    }

    res.json({ bestillingsNummer, pris, data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
