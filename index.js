require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

async function conexion() {
    const resultados = await pool.query('SELECT * FROM public."Productos"');
    console.log(resultados.rows);
}

async function Crear(name, description, Img, Price) {
    await pool.query(
        'INSERT INTO public."Productos" (name, description, "Img", "Price") VALUES ($1, $2, $3, $4)',
        [name, description, Img, Price],
    );
    console.log(
        `Se ha insertado nombre: ${name}, descripcion: ${description}, Img: ${Img}, Price: ${Price}`,
    );
}

async function main() {
    try {
        await conexion();
        await Crear("jamon", "este es un jamon", "https://imagen.com/jamon.png", "20000");
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await pool.end(); // ✅ Se cierra una sola vez
    }
}

main();