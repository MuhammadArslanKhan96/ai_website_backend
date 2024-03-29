import { Pool } from "pg";
import "dotenv/config";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

const createTable = async (tableName: string, columns: string) => {
  const result = await pool.query(
    `
        SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_name = $1
        )
    `,
    [tableName]
  );
  const tableExists = result.rows[0].exists;
  if (!tableExists) {
    await pool.query(`CREATE TABLE ${tableName} (${columns})`);
  }
};

createTable(
  "company",
  "id SERIAL PRIMARY KEY, name TEXT NOT NULL, profile_id TEXT NOT NULL, registration_date DATE NOT NULL, license_valid_until DATE NOT NULL"
);
createTable(
  "users",
  "id SERIAL PRIMARY KEY, name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL, phone_number TEXT NOT NULL, password TEXT NOT NULL, type TEXT"
);
createTable(
  "messages",
  "id SERIAL PRIMARY KEY, role TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL, user_id INT REFERENCES users(id)"
);
createTable(
  "instructions",
  "id SERIAL PRIMARY KEY, name TEXT NOT NULL, instructions TEXT NOT NULL, created_at TEXT NOT NULL, user_id INT REFERENCES users(id)"
);

export const query = (text: string, params: any[]) => pool.query(text, params);
