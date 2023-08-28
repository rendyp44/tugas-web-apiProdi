import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css'

const Mahasiswa=()=>{
const {npm} = useParams();
const [dataKelas, setDataKelas] = useState(null);
var isFound = false;

const getSelectedData = async (npm) => {
    const res = await axios.get("https://strapi-rygs.onrender.com/api/prodis");
    try{
        setDataKelas(res.data.data[0].attributes.prodi[0].filter((data) =>data.kode_prodi==npm.slice(4,6)).map(x=>x.mahasiswa)[0].filter((data) => data.tahun_masuk=='20'+npm.slice(0,2))[0].data);
    }catch{
        isFound=false;
    }
}

useEffect(() => {
    getSelectedData(npm)
}, [npm]);

return (
<div>
    <h1>Data Mahasiswa</h1>
    {dataKelas==null? (<div>Loading . . .</div>):(

    ["pagi","malam","cuti"].map((kelas,index) => (
    <>
        {/* {console.log(dataKelas[kelas])} */}
        <h1 key={index}></h1>
        {dataKelas[kelas].map((mahasiswa,index)=>(
        <>
            {mahasiswa.id===Number(npm.slice(6,10))&&npm.length==10? (
            <>
                {/* {console.log(mahasiswa)} */}
                {isFound=true}
                <table key={index}>
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
            </>
            ):(
            <div></div>
            )}
        </>
        ))}
    </>
    )))}
    {!isFound || dataKelas==null || npm.length!=10? (<div>Mahasiswa tidak terdata!</div>):(<></>)}
</div>
)}

export default Mahasiswa;