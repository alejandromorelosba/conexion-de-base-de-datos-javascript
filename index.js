require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

const formatoColombiano = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
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

async function listar() {
    const resultado = await pool.query('SELECT * FROM public."Productos"');
    resultado.rows.forEach(producto => {
        console.log(
            `El producto ${producto.id} con nombre ${producto.name} cuesta ${formatoColombiano.format(parseInt(producto.Price, 10))}`
        );
    });
}

async function eliminar(id) {
    await pool.query(
        'DELETE FROM public."Productos" WHERE id = $1',
        [id]
    );
    console.log(`Se ha eliminado el producto con el ID: ${id}`);
}
    

async function main() {
    try {
        
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await pool.end(); // ✅ Se cierra una sola vez
    }
}

main();