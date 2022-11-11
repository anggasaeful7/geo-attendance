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


@app.route('/absen_siswa', methods=['POST'])
def absen_guru():
    hasil = {"status": "gagal insert data absen siswa"}

    try:
        data = request.json

        longitude = 107.610112
        latitude = -6.9173248

        long = str(longitude)
        lat = str(latitude)

        if (long == data["long"] and lat == data["lat"]):
            query = "INSERT INTO tbl_absen_siswa(id_absen_siswa, nis, nama, latitude, longitude) VALUES(%s,%s,%s,%s,%s)"

            values = (None, data["nis"], data["nama"],
                      data["lat"], data["long"])
            mycursor = mydb.cursor()
            mycursor.execute(query, values)
            mydb.commit()
            hasil = {"status": "Anda Berhasil Masuk"}
        else:
            hasil = {"status": "Anda tidak berada di lokasi"}

    except Exception as e:
        print("Error: " + str(e))

    return jsonify(hasil)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5013, debug=True)
