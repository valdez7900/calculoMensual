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
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
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
              <input
                type="text"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Rol del Empleado"
                value={rolEmpleado}
                onChange={(e) => setRol(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label className="font-bold text-slate-700">Tipo de Empleado</label>
              <input
                type="text"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Tipo de Empleado"
                value={tipoEmpleado}
                onChange={(e) => setTipo(e.target.value)}
              />
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
