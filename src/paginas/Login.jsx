import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

export default function Login() {
    const {auth, setAuth} = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alerta, setAlerta] = useState({})
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if([email, password].includes("")){
            setAlerta({msg:"Hay campos vacios",type: "error"})
            return
        }
        if(password.length < 6){
            setAlerta({msg:"El password no tiene el formato correcto",type: "error"})
            return
        }
        setAlerta({})

        try {
            const {data} = await clienteAxios.post("/veterinarios/login", {
                email, password
            })
            setAuth(data)
            localStorage.setItem("tokenAPV",data.token)
            navigate("/admin")
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                type: "error"
            })
        }
    }

    const{msg} = alerta

    return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y Administra {""}
                <span className="text-black"> Pacientes</span>
            </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-6 rounded-xl bg-white">
            { msg && <Alerta
            alerta={alerta} 
            />}
            <form
                onSubmit={handleSubmit}
            >
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
                <button 
                    type="submit"
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover: cursor-pointer hover:bg-indigo-800 md:w-auto">
                    Iniciar Sesión
                </button>
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link to="/registrar-usuario" 
                    className="block text-center my-5 text-gray-500">
                    ¿No tienes cuenta? Crear Cuenta
                </Link>
                <Link to="/olvide-password" 
                    className="block text-center my-5 text-gray-500">
                    ¿Olvidaste tu password? Recuperar Password
                </Link>
            </nav>
        </div>
    </>
  )
}
