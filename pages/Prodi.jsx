import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import '../index.css'

const Prodi = () => {

  const [data, setData] = useState(null);
  const navigate=useNavigate();

  const fetchData = async () => {
    const res = await axios.get("https://strapi-rygs.onrender.com/api/prodis");
    setData(res.data.data[0].attributes.prodi[0]);
  }

  useEffect(() => {
    fetchData()
  }, []);

  const generateNPM = (tahun_masuk, kode_prodi, kode_unik) => {
    const tahunMasuk = tahun_masuk.slice(-2);
    const tahunLulus = parseInt(tahunMasuk) + 4
    const kodeUnik = ("000" + kode_unik).slice(-4);
    return tahunMasuk + tahunLulus + kode_prodi + kodeUnik
  }

  return (
    <div>
      {data?.map((prodi, index) => (
        <div key={index}>
          <div>Kode Prodi : {prodi.kode_prodi}</div>
          <div>Nama Prodi : {prodi.nama_prodi}</div>
          <div>Kepala Prodi : {prodi.kepala_prodi}</div>
          {prodi.sektretaris && <div>Sekretaris : {prodi.sektretaris}</div>}
          {prodi.mahasiswa.map((angkatan, index) => (
            <div key={index}>
              <br />
              <div>Angkatan : {angkatan.tahun_masuk}</div>
              {["pagi", "malam", "cuti"].map((kelas, index) => (
                <div key={index}>
                  <div>Kelas : {kelas}</div>
                  {angkatan.data[kelas].length !== 0 ? (
                    <table border={1} className='border-2'>
                      <thead>
                        <tr className='border-2'>
                          <th>NPM</th>
                          <th>Nama</th>
                          <th>Jenis Kelamin</th>
                          <th>Alamat</th>
                          <th>Hobi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {angkatan.data[kelas].map((mahasiswa, index) => (
                          <tr key={index}>
                            <td className='hover:text-blue-500 hover:underline hover:scale-110 cursor-pointer' onClick={() => navigate(`/mahasiswa/${generateNPM(angkatan.tahun_masuk, prodi.kode_prodi, mahasiswa.id)}`)}>
                              {generateNPM(angkatan.tahun_masuk, prodi.kode_prodi, mahasiswa.id)}
                            </td>
                            <td>{mahasiswa.nama}</td>
                            <td>{
                              mahasiswa.jenis_kelamin === "L" ? "Laki-laki" : mahasiswa.jenis_kelamin === "P" ? "Perempuan" : "Tidak Diketahui"
                            }</td>
                            <td>{mahasiswa.alamat}</td>
                            <td>{mahasiswa.hobi.join(", ")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div>
                      Tidak ada mahasiswa yang mengambil kelas ini.
                    </div>
                  )}




                </div>
              ))}



            </div>
          ))}


          <br />
        </div>
      ))}

    </div>
  )
}

export default Prodi