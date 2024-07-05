import usePacientes from "../hooks/usePacientes"
import Pacientes from "./Pacientes"

const ListadoPacientes = () => {
  const {pacientes} = usePacientes()
  
  return (
    <>
      {pacientes.length ? 
      (
        <>
          <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">Administra tus {""}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

          {pacientes.map(paciente=>(
            <Pacientes 
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>
      ) : 
      (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">Comienza a agregar pacientes y {""}
            <span className="text-indigo-600 font-bold">aparecerán aquí</span>
          </p>
        </>
      )}
    </>
  )
}

export default ListadoPacientes