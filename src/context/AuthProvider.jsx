import { useState, useEffect, createContext} from "react"
import clienteAxios from "../config/axios"

const AuthContext = createContext()

const AuthProvider = ({children}) =>{
    
    const [cargando, setCargando] = useState(true)
    const [auth,setAuth] = useState({})

    useEffect(()=>{
        const autenticarUsuario = async ()=>{
            const token = localStorage.getItem("tokenAPV")
            if(!token) {
                setCargando(false)
                return
            }
            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios("/veterinarios/perfil",config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    },[])

    const cerrarSesion = ()=>{
        localStorage.removeItem("tokenAPV")
        setAuth({})
    }

    const actualizarPerfil = async (datos)=>{
        const token = localStorage.getItem("tokenAPV")
        if(!token) {
            setCargando(false)
            return
        }
        const config ={
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const {data} = await clienteAxios.put(url,datos, config)
            return {
                msg:"Actualizado correctamente",
                type:"ok"
            }
        } catch (error) {
            return{
                msg:error.response.data.msg,
                type: "error"
            }
        }
    }

    const guardarPassword = async (datos)=>{
        const token = localStorage.getItem("tokenAPV")
        if(!token) {
            setCargando(false)
            return
        }
        const config ={
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = "/veterinarios/actualizar-password"
            const {data} = await clienteAxios.put(url,datos,config)
            console.log(data)
            return{
                msg:data.msg,
                type: "ok"
            }
        } catch (error) {
            return{
                msg:error.response.data.msg,
                type:"error"
            }
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext