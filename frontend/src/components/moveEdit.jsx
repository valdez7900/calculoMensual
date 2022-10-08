import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const MovimientoEdit = () => {
    const [checked, setChecked] = useState(false);
    const [idEmpleado, setIdEmpleado] = useState("");
    const [nombreEmpleado, setNombre] = useState("");
    const [rolEmpleado, setRol] = useState("");
    const [tipoEmpleado, setTipo] = useState("");
    const [cubrio, setCubrio] = useState("");
    const [cantidadEntregas, setEntregas] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      const getMovimientoById = async () => {
        const response = await axios.get(`http://localhost:5000/movimientos/${id}`);
        setIdEmpleado(response.data.idEmpleado);
        setCubrio(response.data.cubrioA);
        setEntregas(response.data.cantidadEntregas);
        const response2 = await axios.get(`http://localhost:5000/empleados/${idEmpleado}`);
        setNombre(response2.data.nombreEmpleado);
        setRol(response2.data.rolEmpleado);
        setTipo(response2.data.tipoEmpleado);
      };
      getMovimientoById();
    }, [id,idEmpleado]);
  
    const updateMovimiento = async (e) => {
      e.preventDefault();
      await axios.patch(`http://localhost:5000/movimientos/${id}`, {
        cantidadEntregas: parseInt(cantidadEntregas),
        cubrioA: cubrio
      });
      navigate(`/move/${idEmpleado}`);
    };
  
    return (
      <div className="max-w-lg mx-auto my-10 bg-white p-4 rounded-xl shadow shadow-slate-300">
        <form onSubmit={updateMovimiento} className="my-10">
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
                placeholder="Rol del Empleado"
                value={tipoEmpleado}
                disabled
              />
            </div>
            <div className="mb-5">
              <label className="font-bold text-slate-700">Fecha</label>
              <input
                type="text"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Rol del Empleado"
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
                placeholder="Nombre del Empleado"
                value={cantidadEntregas}
                onChange={(e) => setEntregas(e.target.value)}
              />
            </div>

            <div className="mb-5">
            <label className="font-bold text-slate-700">Cubrio a? <input checked={checked} onChange={() => {
                
                 setChecked(!checked)
              }
           } id="default-checkbox" type="checkbox" value="yes" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input></label> 
            
                <div className="flex items-center mb-4">
                    <input checked={cubrio==="Chofer"} onClick={(e) => setCubrio(e.target.value)} disabled={!checked} id="default-radio-1" type="radio" value="Chofer" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 ">Chofer</label>
                </div>
                <div className="flex items-center">
                    <input checked={cubrio==="Cargador"} onClick={(e) => setCubrio(e.target.value)} disabled={!checked} id="default-radio-2" type="radio" value="Cargador" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 ">Cargador</label>
                </div>
            </div>
            
          </div>
          <button
              type="submit"
              className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
            >
              Editar Movimiento
            </button>
        </form>
      </div>
    );
}

export default MovimientoEdit
