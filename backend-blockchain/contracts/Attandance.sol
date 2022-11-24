// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

contract SMA {
    struct Murid {
        uint nis;
        string nama;
        string kelas;
        string alamat;
    }

    mapping(string => Murid) private chain;

    function setAbsen(
        uint nis,
        string memory nama,
        string memory kelas,
        string memory alamat,
        string memory tanggal
    ) public {
        chain[concatenate(nama, tanggal)] = Murid(nis, nama, kelas, alamat);
    }

    function concatenate(
        string memory s1,
        string memory s2
    ) private pure returns (string memory) {
        return string(abi.encodePacked(s1, s2));
    }

    function getAbsen(
        string memory nama,
        string memory tanggal
    ) public view returns (Murid memory) {
        return chain[concatenate(nama, tanggal)];
    }
}
