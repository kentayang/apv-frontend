import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {
    const [nombre, setNombre] = useState("")
    const [propietario, setPropietario] = useState("")
    const [email, setEmail] = useState("")
    const [fecha_alta, setFecha_Alta] = useState("")
    const [sintomas, setSintomas] = useState("")
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const { guardarPaciente, paciente } = usePacientes()
    
    useEffect(()=>{
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha_Alta(paciente.fecha_alta)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    },[paciente])

    const handleSubmit = (e)=>{
        e.preventDefault()

        //Validamos el formulario
        if([nombre,propietario,email,fecha_alta,sintomas].includes("")){
            setAlerta({
                msg: "Todos los campos son obligatorios.",
                type: "error"
            })
            return
        }
        
        //Pasa validacion
        guardarPaciente({nombre,propietario,email,fecha_alta,sintomas, id})
        setAlerta({msg:"Guardado correctamente", type: "ok"})
        setNombre("")
        setPropietario("")
        setEmail("")
        setFecha_Alta("")
        setSintomas("")
        setId(null)
    }

    const {msg} = alerta

  return (
    <>
        <h2 className="font-black text-3xl text-center">Nuevo Paciente</h2>
        <p className="text-xl mt-5 mb-10 text-center">Agrega tus pacientes y {""}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>
        
        <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
            onSubmit={handleSubmit}>
            <div className="mb-5">
                <label 
                    htmlFor="nombre"
                    className="text-gray-700 uppercase font-bold"
                >Nombre Mascota</label>
                <input 
                    id="nombre"
                    type="text"
                    placeholder="Nombre de la mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)} />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="propietario"
                    className="text-gray-700 uppercase font-bold"
                >Nombre Propietario</label>
                <input 
                    id="propietario"
                    type="text"
                    placeholder="Nombre del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}/>
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="email"
                    className="text-gray-700 uppercase font-bold"
                >Email</label>
                <input 
                    id="email"
                    type="email"
                    placeholder="Ingresa email"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="fecha_alta"
                    className="text-gray-700 uppercase font-bold"
                >Fecha Alta</label>
                <input 
                    id="fecha_alta"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    value={fecha_alta}
                    onChange={e => setFecha_Alta(e.target.value)}/>
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="sintomas"
                    className="text-gray-700 uppercase font-bold"
                >sintomas</label>
                <textarea 
                    id="sintomas"
                    placeholder="Describe los síntomas"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}/>
            </div>
            <button 
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white 
                font-bold uppercase hover:bg-indigo-700 cursor-pointer
                transition-colors">
                {id ? "Guardar Cambios" : "Agregar Paciente"}
            </button>
        </form>
        {msg && <Alerta alerta={alerta} />}
    </>
  )
}

export default Formulario