CREATE DATABASE IF NOT EXISTS inventario_db;
USE inventario_db;

-- 1. Tabla de Categorías (Nueva para cumplir requisito)
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Insertar categorías por defecto
INSERT INTO categorias (nombre) VALUES ('Electrónica'), ('Muebles'), ('Accesorios'), ('Ropa'), ('Hogar');

-- 2. Tabla de Productos (Modificada para usar ID de categoría)
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    categoria_id INT NOT NULL, -- Relación con categorías
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- 3. Tabla de Movimientos
CREATE TABLE movimientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    tipo ENUM('Entrada', 'Salida') NOT NULL,
    cantidad INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- Datos de prueba
INSERT INTO productos (sku, nombre, precio, stock, categoria_id) VALUES 
('LAP-001', 'Laptop HP', 1200.00, 10, 1), -- 1 es Electrónica
('SILLA-X', 'Silla Gamer', 250.00, 5, 2); -- 2 es Muebles