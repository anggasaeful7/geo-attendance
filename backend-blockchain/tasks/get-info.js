const { task } = require("hardhat/config")

task("get-info", "Get Information of Person Attandance").setAction(
    async (taskArgs, hre) => {
        let nama = "Raha"
        let tanggal = "23/11/2022"
        const contract = await hre.ethers.getContractAt(
            "SMA",
            "0x8BC5430f625E73b9A4F342Cc484eE94a24460393"
        )
        const getAbsen = await contract.getAbsen(nama, tanggal)
        console.log(`Who's absen : ${getAbsen}`)
    }
)

module.exports = {}
