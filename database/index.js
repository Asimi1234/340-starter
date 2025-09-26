const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

let pool;

if (process.env.DATABASE_URL) {
  // For Render or production, using DATABASE_URL
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // Local development
  pool = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5432,
    database: process.env.DB_NAME,
  });
}

pool.on('connect', () => {
  console.log('PostgreSQL connected successfully');
});

module.exports = pool;
