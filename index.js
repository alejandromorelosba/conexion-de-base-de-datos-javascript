require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

async function conexion() {
    try {
        const resultados = await pool.query("SELECT NOW()");
        console.log("Conexión exitosa:", resultados.rows[0]);
    } catch (error) {
        console.error("Error al conectar a PostgreSQL:", error.message);
    } finally {
        await pool.end();
    }
}

conexion();

