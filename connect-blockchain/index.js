import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const getButton = document.getElementById("getButton")
const setButton = document.getElementById("setButton")
connectButton.onclick = connect
getButton.onclick = get
setButton.onclick = set

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

async function get() {
    const get_nama = document.getElementById("get-nama").value
    const get_tanggal = document.getElementById("get-tanggal").value
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.getAbsen(get_nama, get_tanggal)
        console.log(transactionResponse)
        document.getElementById("hasil").innerHTML = transactionResponse
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}

async function set() {
    console.log("set")
    const nis = document.getElementById("nis").value
    const nama = document.getElementById("set_nama").value
    const kelas = document.getElementById("kelas").value
    const alamat = document.getElementById("alamat").value
    const tanggal = document.getElementById("set_tanggal").value
    console.log(nis, nama, kelas, alamat, tanggal)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.setAbsen(nis, nama, kelas, alamat, tanggal)
        await transactionResponse.wait(1)
        console.log(transactionResponse)
        document.getElementById("absen").innerHTML = transactionResponse
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}
