import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {
  const {guardarPassword} = useAuth()
  const [alerta,setAlerta] = useState({})
  const [password,setPassword] = useState({
    passwordActual: "",
    passwordNuevo: ""
  })
  
  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(Object.values(password).some(campo => campo === "")){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        type: "error"
      })
      return
    }
    if(password.passwordNuevo.length < 6){
      setAlerta({
        msg: "El password debe tener minimo debe 6 caracteres",
        type: "error"
      })
      return
    }
    //Pasa la validacion
    const respuesta = await guardarPassword(password)
    setAlerta(respuesta)
  }
  
  const {msg} = alerta

    return (
        <>
          <AdminNav />

          <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
          <p className="text-xl mt-5 mb-10 text-center">Modifica tu {""}
            <span className="text-indigo-600 font-bold">Password aqui</span>
          </p>

          <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="passwordActual" className="uppercase font-bold text-gray-600">Password Actual</label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="passwordActual"
                            id="passwordActual"
                            placeholder="Escribe tu password actual"
                            onChange={e=> setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}
                            
                        ></input>
                    </div>
                    <div className="my-3">
                        <label htmlFor="passwordNuevo" className="uppercase font-bold text-gray-600">Password Nuevo</label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="passwordNuevo"
                            id="passwordNuevo"
                            placeholder="Escribe tu password nuevo"
                            onChange={e=> setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}

                        ></input>
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                    >Actualizar Password</button>
                </form>
            </div>
          </div>
        </>
      )
}

export default CambiarPassword