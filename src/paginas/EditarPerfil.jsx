import { useEffect,useState } from "react"
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"

const EditarPerfil = () => {
    const {auth, actualizarPerfil} = useAuth()
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    useEffect(()=>{
        setPerfil(auth)
    },[auth])

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const {nombre, email} = perfil
        if([nombre,email].includes("")){
            setAlerta({
                msg:"El nombre y el email no pueden estar vacíos.",
                type: "error"
            })
            return
        }

        //Pasa la validacion
        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)
    }
    
    const {msg} = alerta

    return (
      <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
          <p className="text-xl mt-5 mb-10 text-center">Modifica tu {""}
            <span className="text-indigo-600 font-bold">Información aqui</span>
          </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="nombre"
                            id="nombre"
                            value={perfil.nombre ||""}
                            onChange={e=>setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                        ></input>
                    </div>
                    <div className="my-3">
                        <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio web</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="web"
                            id="web"
                            value={perfil.web ||""}
                            onChange={e=>setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                        ></input>
                    </div>
                    <div className="my-3">
                        <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Teléfono</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="telefono"
                            id="telefono"
                            value={perfil.telefono ||""}
                            onChange={e=>setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                        ></input>
                    </div>
                    <div className="my-3">
                        <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="email"
                            id="email"
                            value={perfil.email ||""}
                            onChange={e=>setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                        ></input>
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                    >Guardar Cambios</button>
                </form>
            </div>
        </div>
      </>
    )
  }
  
  export default EditarPerfil