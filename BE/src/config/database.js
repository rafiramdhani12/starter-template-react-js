import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["DB_HOST", "DB_USER", "DB_NAME"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`${key} is required`);
    process.exit(1);
  }
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true,
});

async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to database");
    connection.release();
  } catch (e) {
    console.log("databse connection failed", e.message);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  await pool.end();
  console.log("🛑 Database pool closed");
  process.exit(0);
});

export default pool;
