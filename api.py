from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permitir CORS

# Configuración de la base de datos
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'M1596321123ak'
app.config['MYSQL_DB'] = 'riego'

mysql = MySQL(app)

@app.route('/')
def home():
    return "API de riego funcionando correctamente"


# clientes leer

@app.route('/clientes', methods=['GET'])
def get_clientes():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT nombres, apellidos, direccion FROM clientes")
    data = cursor.fetchall()
    cursor.close()
    clientes = []
    for row in data:
        cliente = {
            'nombres': row[0],
            'apellidos': row[1],
            'direccion': row[2]
        }
        clientes.append(cliente)
    return jsonify(clientes)

# configuracion leer

@app.route('/configuracion', methods=['GET'])
def get_configuracion():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT area, hum_min FROM configuracion")
    data = cursor.fetchall()
    cursor.close()
    configuraciones = []
    for row in data:
        configuracion = {
            'area': row[0],
            'humedad': row[1]
        }
        configuraciones.append(configuracion)
    return jsonify(configuraciones)


# cliente agregar

@app.route('/clientead', methods=['POST'])
def add_cliente():
    nombre = request.json['nombres']
    apellido = request.json['apellidos']
    direccion = request.json['direccion']
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO clientes (nombres, apellidos, direccion) VALUES (%s, %s, %s)", (nombre, apellido, direccion))
    mysql.connection.commit()
    cliente_id = cursor.lastrowid  # Capturar el ID del cliente recién insertado
    cursor.close()
    return jsonify({'message': 'Cliente añadido correctamente', 'id': cliente_id}), 201

# configuracion agregar

@app.route('/configuracion', methods=['POST'])
def add_configuracion():
    data = request.json
    id_cliente = data.get('id_cliente')
    area = data.get('area')
    hum_min = data.get('hum_min')
    hum_max = data.get('hum_max')

    if not all([id_cliente, area, hum_min, hum_max]):
        return jsonify({'error': 'Todos los campos son requeridos'}), 400

    try:
        cursor = mysql.connection.cursor()
        cursor.execute("""
            INSERT INTO configuracion (id_cliente, area, hum_min, hum_max)
            VALUES (%s, %s, %s, %s)
        """, (id_cliente, area, hum_min, hum_max))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'message': 'Configuración guardada correctamente'}), 201
    except Exception as e:
        print(f'Error al guardar la configuración: {e}')
        return jsonify({'error': 'Error al guardar la configuración'}), 500




if __name__ == '__main__':
    app.run(debug=True)


