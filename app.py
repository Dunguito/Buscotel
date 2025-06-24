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
    email = data.get('email')
    motivo = data.get('motivo')
    asunto = data.get('asunto')
    mensaje = data.get('mensaje')

    if not all([nombre, email, asunto, mensaje]):
        return jsonify({"msg": "ERROR: Los datos del formulario no están completos"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO contacts (nombre, email, asunto,motivo, mensaje) VALUES (?, ?, ?, ?, ?)',
            (nombre, email, asunto,motivo, mensaje)
        )
        conn.commit()
        conn.close()
        print(f"Mensaje recibido de {nombre} ({email}): {asunto} - {mensaje}")
        return jsonify({"msg": "Mensaje recibido!"}), 201
    except Exception as e:
        print(f"Error del servidor: {e}")
        return jsonify({"msg": "Error del servidor"}), 500
    
@app.route('/api/hoteles/<int:id>', methods=['PUT'])
def update_hotel(id: int):
    ciudad = request.args.get("ciudad")
    fecha_inicio = request.args.get("fecha_inicio")
    fecha_fin = request.args.get("fecha_fin")
    capacidad = request.args.get("capacidad")
    nombre = request.args.get("nombre")
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = 'UPDATE hoteles SET nombre = ? , capacidad = ? , fecha_inicio_disponible = ? , fecha_fin_disponible = ?, ciudad = ?  where id = ?'
        params = (nombre, capacidad, fecha_inicio, fecha_fin, ciudad, id)

        cursor.execute(query, params)

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify("Hotel actualizado"), 200
    except Exception as e:
        print(f"Error del servidor: {e}")
        return jsonify({"msg": "Error del servidor"}), 500

@app.route('/api/hoteles/<int:id>', methods=['DELETE'])
def delete_hotel(id: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = 'DELETE FROM hoteles where id = ?'
        params = (id,)

        cursor.execute(query, params)

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify("Hotel borrado"), 200
    except Exception as e:
        print(f"Error del servidor: {e}")
        return jsonify({"msg": "Error del servidor"}), 500



@app.route('/api/hoteles', methods=['GET'])
def get_hoteles():
    ciudad = request.args.get("ciudad")
    fecha_inicio = request.args.get("fecha_inicio")
    fecha_fin = request.args.get("fecha_fin")
    huespedes = request.args.get("huespedes")

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        ciudad = f"%{ciudad}%"
        cursor.execute('SELECT * FROM hoteles WHERE ciudad LIKE ? AND fecha_inicio_disponible <= ? AND fecha_fin_disponible >= ? AND capacidad >= ?', (ciudad, fecha_inicio, fecha_fin, huespedes)) 
        hoteles = cursor.fetchall()
        cursor.close()
        conn.close()
        hoteles_list = [
            {
                "id": row[0],
                "nombre": row[1],
                "capacidad": row[2],
                "fecha_inicio_disponible": row[3],
                "fecha_fin_disponible": row[4],
                "ciudad": row[5]
            }
            for row in hoteles
        ]
        return jsonify(hoteles_list), 200
    except Exception as e:
        print(f"Error del servidor: {e}")
        return jsonify({"msg": "Error del servidor"}), 500


if __name__ == '__main__':
    with app.app_context():
        init_db()
    app.run(debug=True)
