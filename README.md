# Buscotel

Buscotel es una aplicación web que permite visualizar hoteles disponibles en diferentes ciudades. Está orientada a usuarios que desean consultar opciones de alojamiento, con detalles como la capacidad, fechas de disponibilidad y ubicación.

---

## Características

- Visualización de hoteles disponibles.
- Detalle de cada hotel: nombre, ciudad, capacidad y fechas de disponibilidad.
- Interfaz web sencilla con frontend y backend integrados.
- Base de datos SQLite para almacenamiento de información.
- Estructura modular con carpetas para imágenes, archivos estáticos y plantillas HTML.

---

## Tecnologías utilizadas

- Python (Flask) para el backend.
- SQLite como base de datos.
- HTML, CSS y JavaScript para el frontend.
- Estructura MVC básica con `templates` y `static`.

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/Dunguito/Buscotel.git
cd Buscotel
```

2. Crear y activar un entorno virtual (opcional pero recomendado):

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

3. Instalar las dependencias:

```bash
pip install -r requirements.txt
```

4. Inicializar la base de datos (si aplica):

```bash
python init_db.py  # O ejecutar el script SQL manualmente
```

5. Ejecutar la aplicación:

```bash
python app.py
```

6. Abrir en el navegador: `http://localhost:5000`

---

## Estructura del proyecto

```
Buscotel/
│
├── app.py             # Archivo principal de la aplicación
├── database.db        # Base de datos SQLite
├── script.sql         # Script para crear las tablas en la base de datos
├── imagenes/          # Carpeta con imágenes usadas en la app
├── static/            # Archivos estáticos (CSS, JS, imágenes)
├── templates/         # Plantillas HTML para renderizar las vistas
└── README.md          # Documentación del proyecto
```


¡Gracias por usar Buscotel!
