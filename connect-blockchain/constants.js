export const contractAddress = "0x8BC5430f625E73b9A4F342Cc484eE94a24460393"
export const abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "nama",
                type: "string",
            },
            {
                internalType: "string",
                name: "tanggal",
                type: "string",
            },
        ],
        name: "getAbsen",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "nis",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "nama",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "kelas",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "alamat",
                        type: "string",
                    },
                ],
                internalType: "struct SMA.Murid",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "nis",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "nama",
                type: "string",
            },
            {
                internalType: "string",
                name: "kelas",
                type: "string",
            },
            {
                internalType: "string",
                name: "alamat",
                type: "string",
            },
            {
                internalType: "string",
                name: "tanggal",
                type: "string",
            },
        ],
        name: "setAbsen",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]
