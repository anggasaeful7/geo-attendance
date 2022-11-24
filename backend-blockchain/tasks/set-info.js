const { task } = require("hardhat/config")

task("set-info", "Set Person Attandance").setAction(async (taskArgs, hre) => {
    let nis = "789"
    let nama = "Agus"
    let kelas = "XII MIpa 4"
    let alamat = "Bandung"
    let tanggal = "18/11/2022"
    const contract = await hre.ethers.getContractAt(
        "SMA",
        "0x8BC5430f625E73b9A4F342Cc484eE94a24460393"
    )
    const setAbsen = await contract.setAbsen(nis, nama, kelas, alamat, tanggal)
    await setAbsen.wait(1)
})

module.exports = {}
