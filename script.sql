DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS hoteles;

CREATE TABLE contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    asunto TEXT NOT NULL,
    mensaje TEXT NOT NULL,
    motivo TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hoteles (
    id INTEGER PRIMARY KEY,
    nombre VARCHAR(100),
    capacidad INTEGER,
    fecha_inicio_disponible DATE,
    fecha_fin_disponible DATE,
    ciudad VARCHAR(100)
);


INSERT INTO hoteles (id, nombre, capacidad, fecha_inicio_disponible, fecha_fin_disponible, ciudad) VALUES
(1, 'Hotel Sol Andino', 2, '2025-07-01', '2025-07-15', 'Mendoza'),
(2, 'Altos del Lago', 4, '2025-06-25', '2025-07-10', 'Bariloche'),
(3, 'El Refugio Serrano', 5, '2025-07-05', '2025-07-20', 'Cordoba'),
(4, 'Cielo Azul Resort', 3, '2025-06-30', '2025-07-18', 'Mar del Plata'),
(5, 'EcoHostel Patagonia', 1, '2025-07-10', '2025-07-25', 'El Calafate'),
(6, 'Hotel Boutique Nube', 2, '2025-07-01', '2025-07-12', 'Salta'),
(7, 'Posada del Río', 5, '2025-06-20', '2025-07-05', 'San Rafael'),
(8, 'Aguas Termales Inn', 3, '2025-07-15', '2025-07-30', 'Termas de Rio Hondo'),
(9, 'Mirador del Valle', 4, '2025-06-28', '2025-07-08', 'Tafi del Valle'),
(10, 'Costa Serena Hotel', 5, '2025-07-03', '2025-07-18', 'Villa Gesell');