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

        longitude = 107.610112
        longitude2 = 107.610113
        latitude = -6.9173248
        latitude2 = -6.9173249

        long = str(longitude)
        lat = str(latitude)
        lat2 = str(latitude2)
        long2 = str(longitude2)

        longi = 107.610113
        lati = -6.9173249

        if ((long == data["long"] and lat == data["lat"]) or (long2 == longi and lat2 == lati)):
            query = "INSERT INTO tbl_absen_guru(id_absen_guru, nip, nama, latitude, longitude) VALUES(%s,%s,%s,%s,%s)"

            values = (None, data["nip"], data["nama"],
                      lati, longi)
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
    app.run(host='0.0.0.0', port=5012, debug=True)
