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


@app.route('/get_data_siswa', methods=['GET'])
def get_data_siswa():
    query = "SELECT * FROM tbl_siswa WHERE 1=1"
    values = ()

    nis = request.args.get("nis")
    nama = request.args.get("nama")

    if nis:
        query += " AND nis=%s "
        values += (nis,)
    if nama:
        query += " AND nama LIKE %s "
        values += ("%"+nama+"%", )

    mycursor = mydb.cursor()
    mycursor.execute(query, values)
    data = mycursor.fetchall()

    row_headers = [x[0] for x in mycursor.description]
    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return make_response(jsonify(json_data), 200)


@app.route('/insert_data_siswa', methods=['POST'])
def insert_data_siswa():
    hasil = {"status": "gagal insert data siswa"}

    try:
        data = request.json

        query = "INSERT INTO tbl_siswa(nis, nama, tempat_lahir,tanggal_lahir, alamat, jk, agama, kelas, email, username, password) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        values = (data["nis"], data["nama"], data["tempat"],
                  data["tanggal"], data["alamat"], data["jk"], data["agama"], data["kelas"], data["email"], data["username"], data["password"])
        mycursor = mydb.cursor()
        mycursor.execute(query, values)
        mydb.commit()
        hasil = {"status": "berhasil insert data siswa"}

    except Exception as e:
        print("Error: " + str(e))

    return jsonify(hasil)


@app.route('/update_data_siswa/<nis>', methods=['PUT'])
def update_data_siswa(nis):
    hasil = {"status": "gagal update data siswa"}

    try:
        data = request.json
        # nis_awal = data["nis_awal"]

        query = "UPDATE tbl_siswa SET nis = %s "
        values = (nis, )

        if "nis" in data:
            query += ", nis = %s"
            values += (data["nis"], )
        if "nama" in data:
            query += ", nama = %s"
            values += (data["nama"], )
        if "tempat_lahir" in data:
            query += ", tempat_lahir = %s"
            values += (data["tempat_lahir"], )
        if "tanggal_lahir" in data:
            query += ", tanggal_lahir = %s"
            values += (data["tanggal_lahir"], )
        if "alamat" in data:
            query += ", alamat = %s"
            values += (data["alamat"], )
        if "jk" in data:
            query += ", jk = %s"
            values += (data["jk"], )
        if "agama" in data:
            query += ", agama = %s"
            values += (data["agama"], )
        if "kelas" in data:
            query += ", kelas = %s"
            values += (data["kelas"], )
        if "email" in data:
            query += ", email = %s"
            values += (data["email"], )
        if "username" in data:
            query += ", username = %s"
            values += (data["username"], )
        if "password" in data:
            query += ", password = %s"
            values += (data["password"], )

        query += " WHERE nis = %s"
        values += (nis, )

        mycursor = mydb.cursor()
        mycursor.execute(query, values)
        mydb.commit()
        hasil = {"status": "berhasil update data siswa"}

    except Exception as e:
        print("Error: " + str(e))

    return jsonify(hasil)


@app.route('/delete_data_siswa/<nis>', methods=['DELETE'])
def delete_data_siswa(nis):
    hasil = {"status": "gagal hapus data siswa"}

    try:

        query = "DELETE FROM tbl_siswa WHERE nis=%s"
        values = (nis,)
        mycursor = mydb.cursor()
        mycursor.execute(query, values)
        mydb.commit()
        hasil = {"status": "berhasil hapus data siswa"}

    except Exception as e:
        print("Error: " + str(e))

    return jsonify(hasil)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5011, debug=True)
