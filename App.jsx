import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [prodi,setProdi]=useState(null);

  useEffect(()=>{
    const getProdi = async() => {
      const prodi = await axios.get("https://strapi-rygs.onrender.com/api/prodis")
      setProdi(prodi.data.data[0].attributes.prodi[0])
    }
    getProdi();
  },[])

  function getMahasiswaId(id){
    if(id>999){return id}
    else if(id>99){return ("0")+id}
    else if(id>9){return ("00")+id}
    else {return ("000"+id)}
  }
  
  return (
    <div>
      {prodi?.map((prodi,index)=>(
        <>
        <br/><hr/>
        <p key={index}>{prodi.nama_prodi}</p>
        <p>Kepala : {prodi.kepala_prodi}</p>
        {prodi.sektretaris && <p>Sekretaris : {prodi.sektretaris}</p>}
        {prodi.mahasiswa?.map((angkatan,index)=>(
          <>
          <p key={index}><br />Angkatan : {angkatan.tahun_masuk}</p>
          <p>Kelas Pagi</p>
          {(angkatan.data.pagi)?<table>
            <thead>
              <tr>
                <th>NPM</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Jenis Kelamin</th>
                <th>Hobi</th>
              </tr>
            </thead>
            <tbody>
          {angkatan.data.pagi?.map((kelasPagi,index)=>(
            <>
              <tr key={index}>
                <td>{angkatan.tahun_masuk.slice(-2)}{parseInt(angkatan.tahun_masuk.slice(-2))+4}{prodi.kode_prodi}{getMahasiswaId(kelasPagi.id)}</td>
                <td>{kelasPagi.nama}</td>
                <td>{kelasPagi.alamat}</td>
                <td>{kelasPagi.jenis_kelamin=="L"?"Laki-laki":"Perempuan"}</td>
                <td>{kelasPagi.hobi.join(", ")}</td>
              </tr>
            </>
          ))}
            </tbody>
          </table>:<p>Tidak ada mahasiswa yang mengambil kelas ini</p>}
          <p><br/>Kelas Malam</p>
          {(angkatan.data.malam)?<table>
            <thead>
              <tr>
                <th>NPM</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Jenis Kelamin</th>
                <th>Hobi</th>
              </tr>
            </thead>
            <tbody>
          {angkatan.data.malam?.map((kelasMalam,index)=>(
            <>
              <tr key={index}>
                <td>{angkatan.tahun_masuk.slice(-2)}{parseInt(angkatan.tahun_masuk.slice(-2))+4}{prodi.kode_prodi}{getMahasiswaId(kelasMalam.id)}</td>
                <td>{kelasMalam.nama}</td>
                <td>{kelasMalam.alamat}</td>
                <td>{kelasMalam.jenis_kelamin=="L"?"Laki-laki":"Perempuan"}</td>
                <td>{kelasMalam.hobi.join(", ")}</td>
              </tr>
            </>
          ))}
            </tbody>
          </table>:<p>Tidak ada mahasiswa yang mengambil kelas ini</p>}
          <p><br/>Kelas Cuti</p>
          {(angkatan.data.cuti.length>0)?<table>
            <thead>
              <tr>
                <th>NPM</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Jenis Kelamin</th>
                <th>Hobi</th>
              </tr>
            </thead>
            <tbody>
          {angkatan.data.cuti?.map((kelasCuti,index)=>(
            <>
              <tr key={index}>
                <td>{angkatan.tahun_masuk.slice(-2)}{parseInt(angkatan.tahun_masuk.slice(-2))+4}{prodi.kode_prodi}{getMahasiswaId(kelasCuti.id)}</td>
                <td>{kelasCuti.nama}</td>
                <td>{kelasCuti.alamat}</td>
                <td>{kelasCuti.jenis_kelamin=="L"?"Laki-laki":"Perempuan"}</td>
                <td>{kelasCuti.hobi.join(", ")}</td>
              </tr>
            </>
          ))}
            </tbody>
          </table>:<p>Tidak ada mahasiswa yang mengambil kelas ini</p>}
          </>
        ))}
        </>
      ))}
    </div>
  )
}

export default App
