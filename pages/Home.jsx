import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="text-3xl font-bold underline">Ini Home</div>
      <div>
        <button className="text-2xl bg-slate-900 p-5 m-2 text-yellow-500 hover:text-opacity-50" onClick={() => navigate("/prodi")}>Prodi</button>
      </div>
    </div>
  )
}

export default Home