import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const getGuruButton = document.getElementById("getGuruButton")
const getSiswaButton = document.getElementById("getSiswaButton")
const setGuruButton = document.getElementById("setGuruButton")
const setSiswaButton = document.getElementById("setSiswaButton")
connectButton.onclick = connect
getGuruButton.onclick = get_guru
getSiswaButton.onclick = get_siswa
setGuruButton.onclick = set_guru
setSiswaButton.onclick = set_siswa

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        connectButton.innerHTML = "Connected"
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(accounts)
    } else {
        connectButton.innerHTML = "Please install MetaMask"
    }
}

async function get_guru() {
    const get_nama = document.getElementById("get-nama-guru").value
    const get_tanggal = document.getElementById("get-tanggal-guru").value
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.getGuru(get_nama, get_tanggal)
        console.log(transactionResponse)
        document.getElementById("nip-guru").innerHTML = transactionResponse[0]
        document.getElementById("nama-guru").innerHTML = transactionResponse[1]
        document.getElementById("longitude-guru").innerHTML = transactionResponse[2]
        document.getElementById("latitude-guru").innerHTML = transactionResponse[3]
        document.getElementById("datetime-guru").innerHTML = transactionResponse[4]
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}

async function get_siswa() {
    const get_nama = document.getElementById("get-nama-siswa").value
    const get_tanggal = document.getElementById("get-tanggal-siswa").value
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.getSiswa(get_nama, get_tanggal)
        console.log(transactionResponse)
        document.getElementById("nis-siswa").innerHTML = transactionResponse[0]
        document.getElementById("nama-siswa").innerHTML = transactionResponse[1]
        document.getElementById("kelas-siswa").innerHTML = transactionResponse[2]
        document.getElementById("mapel-siswa").innerHTML = transactionResponse[3]
        document.getElementById("longitude-siswa").innerHTML = transactionResponse[4]
        document.getElementById("latitude-siswa").innerHTML = transactionResponse[5]
        document.getElementById("datetime-siswa").innerHTML = transactionResponse[6]
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}

async function set_guru() {
    console.log("set")
    const nis = document.getElementById("set-nip-guru").value
    const nama = document.getElementById("set-nama-guru").value
    const long = document.getElementById("set-long-guru").value
    const lat = document.getElementById("set-lat-guru").value
    const tanggal = document.getElementById("set-datetime-guru").value
    console.log(nis, nama, long, lat, tanggal)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.setGuru(nis, nama, long, lat, tanggal)
        await transactionResponse.wait(1)
        console.log(transactionResponse)
        document.getElementById("response-guru").innerHTML = "WORK GAN !!!!"
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}

async function set_siswa() {
    console.log("set")
    const nis = document.getElementById("set-nis-siswa").value
    const nama = document.getElementById("set-nama-siswa").value
    const kelas = document.getElementById("set-kelas-siswa").value
    const mapel = document.getElementById("set-mapel-siswa").value
    const long = document.getElementById("set-long-siswa").value
    const lat = document.getElementById("set-lat-siswa").value
    const tanggal = document.getElementById("set-datetime-siswa").value
    console.log(nis, nama, kelas, mapel, long, lat, tanggal)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.setSiswa(
            nis,
            nama,
            kelas,
            mapel,
            long,
            lat,
            tanggal
        )
        await transactionResponse.wait(1)
        console.log(transactionResponse)
        document.getElementById("response-siswa").innerHTML = "WORK GAN !!!!"
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}
