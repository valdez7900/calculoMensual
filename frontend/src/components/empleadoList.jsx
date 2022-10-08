import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

const EmpleadoList = () => {
    const { mutate } = useSWRConfig();
    const fetcher = async () => {
        const response = await axios.get("http://localhost:5000/empleados");
        return response.data;
    };

    const { data } = useSWR("empleados", fetcher);
    if (!data) return <h2>Cargando...</h2>;

    const deleteProduct = async (empleadoId) => {
        await axios.delete(`http://localhost:5000/empleados/${empleadoId}`);
        mutate("empleados");
    };

    return (
        <div className="flex flex-col mt-20">
          <div className="w-full">
            <Link
              to="/add"
              className="bg-green-500 hover:bg-green-700 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg"
            >
              Agregar Nuevo Empleado
            </Link>
            <div className="relative shadow rounded-lg mt-3">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="py-3 px-1 text-center">No</th>
                    <th className="py-3 px-6">Nombre Empleado</th>
                    <th className="py-3 px-6">Rol Empleado</th>
                    <th className="py-3 px-6">Tipo Empleado</th>
                    <th className="py-3 px-1 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((empleado, index) => (
                      <tr className="bg-white border-b" key={empleado.id}>
                      <td className="py-3 px-1 text-center">{index + 1}</td>
                      <td className="py-3 px-6 font-medium text-gray-900">
                        {empleado.nombreEmpleado}
                      </td>
                      <td className="py-3 px-6">{empleado.rolEmpleado}</td>
                      <td className="py-3 px-6">{empleado.tipoEmpleado}</td>
                      <td className="py-3 px-1 text-center">
                        <Link
                          to={`/edit/${empleado.id}`}
                          className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => deleteProduct(empleado.id)}
                          className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white"
                        >
                          Eliminar
                        </button>
                        <Link
                          to={`/move/${empleado.id}`}
                          className="font-medium bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-black ml-1"
                        >
                          Movimientos
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
}

export default EmpleadoList
