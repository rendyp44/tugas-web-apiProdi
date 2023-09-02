import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
// import axios from 'axios';
import '../index.css';
import prodi from "../api/prodi.json";

const Mahasiswa=()=>{
const {npm} = useParams();
const [dataKelas, setDataKelas] = useState(null);
const [mahasiswa, setMahasiswa] = useState(null);

const getSelectedData = async (npm) => {
    // const res = await axios.get("https://strapi-rygs.onrender.com/api/prodis");
        setDataKelas(prodi[0].filter((data) =>data.kode_prodi==npm.slice(4,6)).map(x=>x.mahasiswa)[0].filter((data) => data.tahun_masuk=='20'+npm.slice(0,2))[0].data);
        Object.keys(dataKelas).map((kelas)=>{
            var findMahasiswa=dataKelas[kelas].find(m=>m.id===Number(npm.slice(6,10)));
            if(findMahasiswa!=undefined&&npm.length==10&&Number(npm.slice(0,2))+4==npm.slice(2,4)){
                setMahasiswa(findMahasiswa)
            }
        })
}

useEffect(() => {
    getSelectedData(npm);
    // console.log(dataKelas);
    // console.log(mahasiswa);
});

return (
<div>
    <h1>Data Mahasiswa</h1>
    {mahasiswa?(
        <table>
        <tbody>
            <tr>
                <td>NPM</td>
                <td>:</td>
                <td>{npm}</td>
            </tr>
            <tr>
                <td>Nama</td>
                <td>:</td>
                <td>{mahasiswa.nama}</td>
            </tr>
            <tr>
                <td>Jenis Kelamin</td>
                <td>:</td>
                <td>{mahasiswa.jenis_kelamin === "L" ? "Laki-laki" : mahasiswa.jenis_kelamin === "P" ? "Perempuan" : "Tidak Diketahui"}</td>
            </tr>
            <tr>
                <td>Alamat</td>
                <td>:</td>
                <td>{mahasiswa.alamat}</td>
            </tr>
            <tr>
                <td>Hobi</td>
                <td>:</td>
                <td>{mahasiswa.hobi.join(", ")}</td>
            </tr>
        </tbody>
    </table>
    ):(<div>Mahasiswa tidak terdata!</div>)}
</div>
)}

export default Mahasiswa;