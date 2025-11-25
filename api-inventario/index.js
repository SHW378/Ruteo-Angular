const express = require('express');
const cors = require('cors');
const connection = require('./db');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- NUEVO: ENDPOINT CATEGORIAS ---
app.get('/api/categorias', (req, res) => {
    connection.query('SELECT * FROM categorias ORDER BY nombre ASC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// --- PRODUCTOS (Actualizado con JOIN) ---
app.get('/api/productos', (req, res) => {
    // Hacemos JOIN para obtener el NOMBRE de la categoría, no solo el ID
    const sql = `
        SELECT p.*, c.nombre as categoria_nombre 
        FROM productos p
        JOIN categorias c ON p.categoria_id = c.id
        ORDER BY p.nombre ASC
    `;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT p.*, c.nombre as categoria_nombre 
        FROM productos p
        JOIN categorias c ON p.categoria_id = c.id
        WHERE p.id = ?
    `;
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(results[0]);
    });
});

app.post('/api/productos', (req, res) => {
    // Ahora recibimos categoria_id en lugar de un string
    const { sku, nombre, categoria_id, precio, stock } = req.body;
    const sql = 'INSERT INTO productos (sku, nombre, categoria_id, precio, stock) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [sku, nombre, categoria_id, precio, stock], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Producto creado', id: result.insertId });
    });
});

app.put('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const { sku, nombre, categoria_id, precio, stock } = req.body;
    const sql = 'UPDATE productos SET sku=?, nombre=?, categoria_id=?, precio=?, stock=? WHERE id=?';
    connection.query(sql, [sku, nombre, categoria_id, precio, stock, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Producto actualizado' });
    });
});

// --- MOVIMIENTOS ---
app.post('/api/movimientos', (req, res) => {
    const { producto_id, tipo, cantidad } = req.body;
    
    if (tipo === 'Salida') {
        connection.query('SELECT stock FROM productos WHERE id = ?', [producto_id], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!results.length || results[0].stock < cantidad) {
                return res.status(400).json({ message: 'Stock insuficiente' });
            }
            ejecutarMovimiento();
        });
    } else {
        ejecutarMovimiento();
    }

    function ejecutarMovimiento() {
        const sqlInsert = 'INSERT INTO movimientos (producto_id, tipo, cantidad) VALUES (?, ?, ?)';
        connection.query(sqlInsert, [producto_id, tipo, cantidad], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            const operador = tipo === 'Entrada' ? '+' : '-';
            const sqlUpdate = `UPDATE productos SET stock = stock ${operador} ? WHERE id = ?`;
            connection.query(sqlUpdate, [cantidad, producto_id], (err2) => {
                if (err2) return res.status(500).json({ error: 'Error al actualizar stock' });
                res.status(201).json({ message: 'Movimiento registrado' });
            });
        });
    }
});

// Obtener historial
app.get('/api/movimientos', (req, res) => {
    const sql = `
        SELECT m.*, p.nombre as producto_nombre, p.sku 
        FROM movimientos m
        JOIN productos p ON m.producto_id = p.id
        ORDER BY m.fecha DESC
    `;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Dashboard
app.get('/api/dashboard', (req, res) => {
    const sqlTotal = 'SELECT COUNT(*) as total_productos, SUM(stock * precio) as valor_total FROM productos';
    const sqlAlertas = 'SELECT * FROM productos WHERE stock < 5';
    
    connection.query(sqlTotal, (err, totalRes) => {
        if (err) return res.status(500).json(err);
        connection.query(sqlAlertas, (err2, alertasRes) => {
            if (err2) return res.status(500).json(err2);
            res.json({ resumen: totalRes[0], alertas: alertasRes });
        });
    });
});

app.listen(PORT, () => console.log(`Servidor ejecutándose en puerto ${PORT}`));