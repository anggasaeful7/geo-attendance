from ast import If
from flask import Flask, request, jsonify, make_response
import pymysql
from flask_cors import CORS

# Membuat server flask
app = Flask(__name__)
CORS(app)

mydb = pymysql.connect(
    host="localhost",
    user="root",
    passwd="",
    database="geo_attendance"
)


@app.route('/')
@app.route('/index')
def index():
    return "<h1>Backend Capstone</h1>"


@app.route('/absen_guru', methods=['POST'])
def absen_guru():
    hasil = {"status": "gagal insert data absen guru"}

    try:
        data = request.json

        longitude = 107.6011363
        latitude = -6.9481348

        if (longitude == data["longitude"] and latitude == data["latitude"]):
            query = "INSERT INTO tbl_absen_guru(id_absen_guru, nip, nama, role, longitude, latitude, datetime, duration) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"

            values = (data["id_absen_guru"], data["nip"], data["nama"], data["role"],
                      data["longitude"], data["latitude"], data["datetime"], data["duration"])
            mycursor = mydb.cursor()
            mycursor.execute(query, values)
            mydb.commit()
            hasil = {"status": "berhasil insert data absen guru"}

    except Exception as e:
        print("Error: " + str(e))

    return jsonify(hasil)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5012, debug=True)
