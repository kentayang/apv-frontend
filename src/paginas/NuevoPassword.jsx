import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const NuevoPassword = () => {
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)

    const params = useParams()
    const {token} = params
    
    useEffect(()=>{
        const comprobarToken = async () =>{
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`)
                setAlerta({
                    msg:"Coloca tu Nuevo Password",
                    type:"ok"
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: "Error con el enlace",
                    type:"error"
                })
            }
        }
        comprobarToken()
    },[])
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if([password,password2].includes("")){
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

        try {
            const url = `/veterinarios/olvide-password/${token}`
            const {data} = await clienteAxios.post(url,{
                password
            })
            setPasswordModificado(true)
            setAlerta({
                msg: data.msg,
                type:"ok"
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                type:"error"
            })
        }
    }

    const {msg} = alerta

    return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Restablece tu {""}
                <span className="text-black"> Password</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-6 rounded-xl bg-white">
            { msg && <Alerta
            alerta={alerta} 
            />}

            {tokenValido && !passwordModificado && (
                <form
                onSubmit={handleSubmit}
                >
                    <fieldset className="my-5">
                        <label htmlFor="password"
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Nuevo Password: </label>
                        <input 
                            type="password" 
                            placeholder="nuevo password"
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
                            placeholder="nuevo password"
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
                        Guardar Nuevo Password
                    </button>
                </form>
            )}
            
            {
                passwordModificado && (
                    <nav className="mt-10">
                    <Link to="/" className="block text-center my-5 
                    text-gray-500">
                        Inicia Sesión
                    </Link>
                    </nav>
                )
            }

        </div>
    </>
  )
}

export default NuevoPassword