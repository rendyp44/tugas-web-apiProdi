import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Mahasiswa=()=>{
    const {npm} = useParams();
    const [data, setData] = useState(null);

    const tes='2125250120';
    console.log(tes.slice(4,6));
    const getSelectedData = async () => {
        const res = await axios.get("https://strapi-rygs.onrender.com/api/prodis");
        console.log(res.data.data[0].attributes.prodi[0]);
        console.log(res.data.data[0].attributes.prodi[0].filter((data) => data.kode_prodi==25).map(x=>x.mahasiswa).filter((data) => data.tahun_masuk==2022));
        setData(res.data.data[0].attributes.prodi[0].filter((data) => data.kode_prodi==25));
      }
    
      useEffect(() => {
        getSelectedData()
        console.log(data);
      }, []); 
    return (
        <div>
            <h1>Data Mahasiswa</h1>
            <table>
                <tr>
                    <td>NPM</td>
                    <td>:</td>
                    <td>{npm}</td>
                </tr>
                <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <td>{npm}</td>
                </tr>
                <tr>
                    <td>Jenis Kelamin</td>
                    <td>:</td>
                    <td>{npm}</td>
                </tr>
                <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>{npm}</td>
                </tr>
                <tr>
                    <td>Hobi</td>
                    <td>:</td>
                    <td>{npm}</td>
                </tr>
            </table>
            <p></p>
        </div>
    )
}

export default Mahasiswa;