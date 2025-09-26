const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

let pool;

if (process.env.DATABASE_URL) {
  // Production / Render
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // Local development
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
  });
}

pool.on('connect', () => {
  console.log('PostgreSQL connected successfully');
});

module.exports = pool;
