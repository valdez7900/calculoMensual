import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EmpleadoEdit = () => {
    const [nombreEmpleado, setNombre] = useState("");
    const [rolEmpleado, setRol] = useState("");
    const [tipoEmpleado, setTipo] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      const getEmpleadoById = async () => {
        const response = await axios.get(`http://localhost:5000/empleados/${id}`);
        setNombre(response.data.nombreEmpleado);
        setRol(response.data.rolEmpleado);
        setTipo(response.data.tipoEmpleado);
      };
      getEmpleadoById();
    }, [id]);
  
    const updateEmpleado = async (e) => {
      e.preventDefault();
      await axios.patch(`http://localhost:5000/empleados/${id}`, {
        nombreEmpleado: nombreEmpleado,
        rolEmpleado: rolEmpleado,
        tipoEmpleado: tipoEmpleado
      });
      navigate("/");
    };
  
    return (
      <div className="mt-20 max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <form onSubmit={updateEmpleado} className="my-10">
          <div className="flex flex-col">
            <div className="mb-5">
              <label className="font-bold text-slate-700">Nombe del Empleado</label>
              <input
                type="text"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Nombre del Empleado"
                value={nombreEmpleado}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-5">
            <label className="font-bold text-slate-700">Rol del Empleado</label>
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <input id="rdChofer" type="radio" value="Chofer" checked={rolEmpleado==="Chofer"} onClick={(e) => setRol(e.target.value)} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label htmlFor="rdChofer" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Chofer</label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <input id="rdCargador" type="radio" value="Cargador" checked={rolEmpleado==="Cargador"} onClick={(e) => setRol(e.target.value)} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label htmlFor="rdCargador" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Cargador</label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <input id="rdAuxiliar" type="radio" value="Auxiliar" checked={rolEmpleado==="Auxiliar"} onClick={(e) => setRol(e.target.value)} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label htmlFor="rdAuxiliar" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Auxiliar</label>
                        </div>
                    </li>
                </ul>
            </div>
            
            <div className="mb-5">
            <label className="font-bold text-slate-700">Tipo de Empleado</label>
            <select value={tipoEmpleado} onClick={(e) => setTipo(e.target.value)} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                <option selected>Escoge Una Opcion</option>
                <option value="Interno">Interno</option>
                <option value="Externo">Externo</option>
            </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    );
}

export default EmpleadoEdit
