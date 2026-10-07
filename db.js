import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Create a connection pool using the DATABASE_URL environment variable
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Helper function to easily run queries throughout the app
export const query = (text, params) => pool.query(text, params);