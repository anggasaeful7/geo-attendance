function loadTableGuru() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:5010/get_data_guru");
    xhttp.send();
  
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = "";
        const objects = JSON.parse(this.responseText);
  
        for (let object of objects) {
          trHTML += "<tr>";
          trHTML += "<td>" + object["nip"] + "</td>";
          trHTML += "<td>" + object["nama"] + "</td>";
          trHTML += "<td>" + object["tempat_lahir"] + "</td>";
          trHTML += "<td>" + object["tanggal_lahir"] + "</td>";
          trHTML += "<td>" + object["alamat"] + "</td>";
          trHTML += "<td>" + object["jk"] + "</td>";
          trHTML += "<td>" + object["agama"] + "</td>";
          trHTML += "<td>" + object["email"] + "</td>";
          trHTML +=
            '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBoxGuru(' +
            object["nip"] +
            ')">Edit</button>';
          trHTML +=
            '<button type="button" class="btn btn-outline-danger" onclick="guruDelete(' +
            object["nip"] +
            ')">Del</button></td>';
          trHTML += "</tr>";
        }
  
        document.getElementById("tableGuru").innerHTML = trHTML;
      }
    };
  }
  
loadTableGuru();
  
  function showUserCreateBoxGuru() {
    Swal.fire({
      title: "Add guru",
      html:
        '<input id="nip" class="input-data" placeholder="nip">' +
        '<input id="nama" class="input-data" placeholder="nama">' +
        '<input id="tempat" class="input-data" placeholder="tempat">' +
        '<input id="tanggal" class="input-data" placeholder="tanggal">' +
        '<input id="alamat" class="input-data" placeholder="alamat">' +
        '<input id="jk" class="input-data" placeholder="jk">' +
        '<input id="agama" class="input-data" placeholder="agama">' +
        '<input id="kelas" class="input-data" placeholder="kelas">' +
        '<input id="email" class="input-data" placeholder="email">' +
        '<input id="username" class="input-data" placeholder="username">' +
        '<input id="password" class="input-data" placeholder="Password">',
      focusConfirm: false,
      preConfirm: () => {
     guruCreate();
      },
    });
  }
  
  function guruCreate() {
    const nip = document.getElementById("nip").value;
    const nama = document.getElementById("nama").value;
    const tempat = document.getElementById("tempat").value;
    const tanggal = document.getElementById("tanggal").value;
    const alamat = document.getElementById("alamat").value;
    const jk = document.getElementById("jk").value;
    const agama = document.getElementById("agama").value;
    const kelas = document.getElementById("kelas").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:5010/insert_data_guru");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
      JSON.stringify({
        nip: nip,
        nama: nama,
        tempat: tempat,
        tanggal: tanggal,
        alamat: alamat,
        jk: jk,
        agama: agama,
        kelas: kelas,
        email: email,
        username: username,
        password: password,
      })
    );
  
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["status"]);
        loadTableGuru();
      }
    };
  }
  
  function showUserEditBoxGuru(nip) {
    console.log(nip);
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:5010/get_data_guru?nip=" + nip);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        // const guru = objects[ guru"];
        console.log(objects);
        for (let object of objects) {
          Swal.fire({
            title: "Edit guru",
            html:
              '<input id="nip" class="input-data" type="hidden" value="' +
              object["nip"] +
              '">' +
              '<input id="nama" class="input-data" value="' +
              object["nama"] +
              '">' +
              '<input id="tempat" class="input-data" value="' +
              object["tempat_lahir"] +
              '">' +
              '<input id="tanggal" class="input-data" value="' +
              object["tanggal_lahir"] +
              '">' +
              '<input id="alamat" class="input-data" value="' +
              object["alamat"] +
              '">' +
              '<input id="jk" class="input-data" value="' +
              object["jk"] +
              '">' +
              '<input id="agama" class="input-data" value="' +
              object["agama"] +
              '">' +
              '<input id="kelas" class="input-data" value="' +
              object["kelas"] +
              '">' +
              '<input id="email" class="input-data" value="' +
              object["email"] +
              '">' +
              '<input id="username" class="input-data" value="' +
              object["username"] +
              '">' +
              '<input id="password" class="input-data" value="' +
              object["password"] +
              '">',
            focusConfirm: false,
            preConfirm: () => {
             guruEdit();
            },
          });
        } 
        
      }
    };
  }
  
  function guruEdit(params) {
    const nip = document.getElementById("nip").value;
    const nama = document.getElementById("nama").value;
    const tempat = document.getElementById("tempat").value;
    const tanggal = document.getElementById("tanggal").value;
    const alamat = document.getElementById("alamat").value;
    const jk = document.getElementById("jk").value;
    const agama = document.getElementById("agama").value;
    const kelas = document.getElementById("kelas").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://127.0.0.1:5010/update_data_guru/" + nip);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
        nip: nip,
        nama: nama,
        tempat: tempat,
        tanggal: tanggal,
        alamat: alamat,
        jk: jk,
        agama: agama,
        kelas: kelas,
        email: email,
        username: username,
        password: password,
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['status']);
        loadTableGuru();
      }
    };
  }
  
  function guruDelete(nip){
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://127.0.0.1:5010/delete_data_guru/" + nip);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "nip": nip
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['status']);
        loadTableGuru();
      } 
    };
  }

  function absenMasukGuru(){
    const id = 12
    const nama = document.getElementById("nama").innerHTML
    const nip = document.getElementById("nip").innerHTML
    const lat = document.getElementById("lat").innerHTML
    const long = document.getElementById("long").innerHTML
    
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:5012/absen_guru");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
      JSON.stringify({
        id_absen_guru: id,
        nip : nip,
        nama: nama,
        lat: lat,
        long: long,
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["status"]);
      }
    };
  }