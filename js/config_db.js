
const sqlite3 = require('sqlite3').verbose();

// Open an existing SQLite database
const db = new sqlite3.Database(__dirname+'/db/film.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;