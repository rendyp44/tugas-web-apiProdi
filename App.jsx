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

  function generateNpm(tahunMasuk,kodeProdi,id){
    const first6Digit=tahunMasuk.slice(-2)+(parseInt(tahunMasuk.slice(-2))+4)+kodeProdi
    if(id>999){return first6Digit+id}
    else if(id>99){return first6Digit+("0"+id)}
    else if(id>9){return first6Digit+("00"+id)}
    else {return first6Digit+("000"+id)}
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
                <td>{generateNpm(angkatan.tahun_masuk,prodi.kode_prodi,kelasPagi.id)}</td>
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
                <td>{generateNpm(angkatan.tahun_masuk,prodi.kode_prodi,kelasMalam.id)}</td>
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
                <td>{generateNpm(angkatan.tahun_masuk,prodi.kode_prodi,kelasCuti.id)}</td>
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
