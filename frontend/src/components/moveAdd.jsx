import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const MovimientoAdd = () => {
    const [checked, setChecked] = useState(false);
    const [idEmpleado, setIdEmpleado] = useState("");
    const [nombreEmpleado, setNombre] = useState("");
    const [rolEmpleado, setRol] = useState("");
    const [tipoEmpleado, setTipo] = useState("");
    const [cubrio, setCubrio] = useState("NA");
    const [cantidadEntregas, setEntregas] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      const getEmpleadoById = async () => {
        const response2 = await axios.get(`http://localhost:5000/empleados/${id}`);
        setIdEmpleado(response2.data.id);
        setNombre(response2.data.nombreEmpleado);
        setRol(response2.data.rolEmpleado);
        setTipo(response2.data.tipoEmpleado);
      };
      getEmpleadoById();
    }, [id]);
  
    const saveEmpleado = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/movimientos", {
          idEmpleado: parseInt(idEmpleado),
          cantidadEntregas: parseInt(cantidadEntregas),
          cubrioA: cubrio
        });
        navigate(`/move/${id}`);
      };
  
    return (
      <div className="mt-20 max-w-lg mx-auto my-10 bg-white p-4 rounded-xl shadow shadow-slate-300">
        <form onSubmit={saveEmpleado} className="my-10">
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-5">
              <label className="font-bold text-slate-700">Nombe del Empleado</label>
              <input
                type="text"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Nombre del Empleado"
                value={nombreEmpleado}
                disabled
              />
            </div>
            <div className="mb-5">
              <label className="font-bold text-slate-700">Rol del Empleado</label>
              <input
                type="text"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Rol del Empleado"
                value={rolEmpleado}
                disabled
              />
            </div>
            <div className="mb-5">
              <label className="font-bold text-slate-700">Tipo Empleado</label>
              <input
                type="text"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Tipo Empleado"
                value={tipoEmpleado}
                disabled
              />
            </div>
            <div className="mb-5">
              <label className="font-bold text-slate-700">Fecha</label>
              <input
                type="text"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Fecha"
                value={new Date().toLocaleString() + ""}
                disabled
              />
            </div>
            <div className="mb-5">
              <label className="font-bold text-slate-700">Cantidad de Entregas</label>
              <input
                type="number"
                min="0"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Cantidad de Entregas"
                value={cantidadEntregas}
                onChange={(e) => setEntregas(e.target.value)}
              />
            </div>

            <div className="mb-5">
            <label className="font-bold text-slate-700">Cubrio a? <input checked={checked} onChange={() => {
                if (checked) {
                    setCubrio("NA");
                }
                 setChecked(!checked)
              }
           } id="default-checkbox" type="checkbox" value="yes" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input></label> 
            
                <div className="flex items-center mb-4">
                    <input disabled={!checked} id="default-radio-1" type="radio" value="Chofer" onClick={(e) => setCubrio(e.target.value)} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 ">Chofer</label>
                </div>
                <div className="flex items-center">
                    <input disabled={!checked} id="default-radio-2" type="radio" value="Cargador" onClick={(e) => setCubrio(e.target.value)}  name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 ">Cargador</label>
                </div>
            </div>
            
          </div>
          <button
              type="submit"
              className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
            >
              Agregar Movimiento
            </button>
        </form>
      </div>
    );
}

export default MovimientoAdd
