
export default function Alerta({alerta}) {
  return (
    <div className={`${alerta.type === "error" ? "from-red-300 to-red-600" : "from-indigo-300 to-indigo-600"} 
        bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}>
        {alerta.msg}
    </div>
  )
}
