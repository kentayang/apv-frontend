import { useEffect, useState} from "react"
import {useParams, Link} from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"

export default function ConfirmarCuenta() {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams()
  const {token} = params

  useEffect(()=>{
    const confirmarCuenta = async ()=>{
      try {
        const url = `/veterinarios/confirmar/${token}`
        const {data} = await clienteAxios.get(url)
        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg,
          type: "ok"
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          type:"error"
        })
      }
      setCargando(false)
    }
    confirmarCuenta()
  }, [])
  
  return (
      <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Confirma tu {""}
                <span className="text-black"> Email</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-6 rounded-xl bg-white">
            {!cargando && 
            <Alerta 
              alerta={alerta}
            />}
            {
              cuentaConfirmada && 
              <Link to="/" className="block text-center my-5 
              text-gray-500">
                Iniciar Sesión
              </Link>
            }
        </div>
      </>
    )
  }
  