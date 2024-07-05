import { useState } from "react"
import { Link } from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"

export default function RegistrarUsuario() {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [alerta,setAlerta] = useState({})

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if([nombre, email, password,password2].includes("")){
            setAlerta({msg:"Hay campos vacios",type: "error"})
            return
        }
        if(password!==password2){
            setAlerta({msg:"Los passwords no son iguales",type: "error"})
            return
        }
        if(password.length < 6){
            setAlerta({msg:"El password es muy corto. Agrega minimo 6 caracteres",type: "error"})
            return
        }
        setAlerta({})

        //Registrar Veterinario
        try {
            await clienteAxios.post("/veterinarios", {nombre, email, password})
            setAlerta({msg:"Usuario creado correctamente. Revisa tu email", type:"ok"})
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                type:"error"
            })
        }
    }
    const {msg} = alerta

    return (
      <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y Administra {""}
                <span className="text-black"> Pacientes</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-6 rounded-xl bg-white">
            { msg && <Alerta
            alerta={alerta} 
            />}
            <form onSubmit={handleSubmit}>
                <fieldset className="my-5">
                    <label htmlFor="nombre"
                        className="uppercase text-gray-600 block text-xl font-bold">
                        Nombre: </label>
                    <input 
                        type="text" 
                        placeholder="Tu nombre"
                        id="nombre" 
                        name="nombre"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={nombre}
                        onChange={e=>setNombre(e.target.value)}
                    />
                </fieldset>
                <fieldset className="my-5">
                    <label htmlFor="email"
                        className="uppercase text-gray-600 block text-xl font-bold">
                        Email: </label>
                    <input 
                        type="email" 
                        placeholder="email@email.com"
                        id="email" 
                        name="email"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset className="my-5">
                    <label htmlFor="password"
                        className="uppercase text-gray-600 block text-xl font-bold">
                        Password: </label>
                    <input 
                        type="password" 
                        placeholder="password"
                        id="password" 
                        name="password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                </fieldset>
                <fieldset className="my-5">
                    <label htmlFor="password2"
                        className="uppercase text-gray-600 block text-xl font-bold">
                        Repite tu Password: </label>
                    <input 
                        type="password" 
                        placeholder="password"
                        id="password2" 
                        name="password2"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password2}
                        onChange={e=>setPassword2(e.target.value)}
                    />
                </fieldset>
                <button 
                    type="submit"
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover: cursor-pointer hover:bg-indigo-800 md:w-auto">
                    Crear Cuenta
                </button>
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link to="/" className="block text-center my-5 
                  text-gray-500">
                    ¿Ya tienes cuenta? Inicia Sesión
                </Link>
                <Link to="/olvide-password" 
                    className="block text-center my-5 
                    text-gray-500">
                    ¿Olvidaste tu password? Recuperar Password
                </Link>
            </nav>
        </div>
      </>
    )
  }
  