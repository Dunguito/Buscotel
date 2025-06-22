from flask import Flask, render_template, request, jsonify
import sqlite3
import os

app = Flask(__name__)

DATABASE = "database.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    return conn

def init_db():
    if os.path.exists(DATABASE): # Si la base de datos existe, no la crea
        return

    print("Creando la base de datos...")
    conn = get_db_connection()
    with app.open_resource('script.sql', mode='r') as f:
        conn.cursor().executescript(f.read())
    conn.commit()
    conn.close()
    print("Base de datos creada")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    if not request.is_json:
        return jsonify({"msg": "ERROR: Se esperaba una solicitud"}), 400

    data = request.get_json()
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    telefono = data.get('telefono')
    mensaje = data.get('mensaje')

    if not all([nombre, apellido, telefono, mensaje]):
        return jsonify({"msg": "ERROR: Los datos del formulario no están completos"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO contacts (nombre, apellido, telefono, mensaje) VALUES (?, ?, ?, ?)',
            (nombre, apellido, telefono, mensaje)
        )
        conn.commit()
        conn.close()
        return jsonify({"msg": "Mensaje recibido!"}), 201
    except Exception as e:
        print(f"Error del servidor: {e}")
        return jsonify({"msg": "Error del servidor"}), 500

@app.route('/api/messages', methods=['GET'])
def get_messages():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM contacts ORDER BY timestamp DESC')
        res = cursor.fetchall()

        column_names = [description[0] for description in cursor.description]
        
        conn.close()

        mensajes = []
        for fila in res:
            mensaje_dict = dict(zip(column_names, fila))
            mensajes.append(mensaje_dict)
            
        return jsonify(mensajes), 200
    except Exception as e:
        print(f"Error del servidor: {e}")
        return jsonify({"msg": "Error del servidor"}), 500
    
if __name__ == '__main__':
    with app.app_context():
        init_db()
    app.run(debug=True)