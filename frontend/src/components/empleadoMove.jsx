import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

const EmpleadoMove = () => {
  const [nombreEmpleado, setNombre] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const getEmpleadoById = async () => {
      const response2 = await axios.get(`http://localhost:5000/empleados/${id}`);
      setNombre(response2.data.nombreEmpleado);
    };
    getEmpleadoById();
  }, [id]);
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
      const response = await axios.get("http://localhost:5000/movimientos");
      
      var array = response.data;
      array = array.filter(movimiento => parseInt(movimiento.idEmpleado) === parseInt(id));

      return array;
  };

  const { data } = useSWR("movimientos", fetcher);
  if (!data) return <h2>Cargando...</h2>;

  const deleteProduct = async (movimientoId) => {
      await axios.delete(`http://localhost:5000/movimientos/${movimientoId}`);
      mutate("movimientos");
  };

  return (
      <div className="flex flex-col mt-20">
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl ">Lista de <span className="text-blue-600 dark:text-blue-500">Movimientos</span></h1>
        <div className="w-full">
          <Link
            to={`/addMove/${id}`}
            className="bg-green-500 hover:bg-green-700 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg"
          >
            Agregar Movimiento
          </Link>
          <div className="relative shadow rounded-lg mt-3">
            <table className="mt-4 w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="py-3 px-1 text-center">No</th>
                  <th className="py-3 px-6">Nombre Empleado</th>
                  <th className="py-3 px-6">Fecha Movimiento Registrado</th>
                  <th className="py-3 px-6">Cantidad de Entregas</th>
                  <th className="py-3 px-6">Cubrio A</th>
                  <th className="py-3 px-1 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((movimiento, index) => (
                    <tr key={movimiento.id}>
                    <td className="py-3 px-1 text-center">{index + 1}</td>
                    <td className="py-3 px-6 font-medium text-gray-900">
                    {nombreEmpleado}
                    </td>
                    <td className="py-3 px-6">{movimiento.fecha}</td>
                    <td className="py-3 px-6">{movimiento.cantidadEntregas}</td>
                    <td className="py-3 px-6">{movimiento.cubrioA}</td>
                    <td className="py-3 px-1 text-center">
                      <Link
                        to={`/editMove/${movimiento.id}`}
                        className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => deleteProduct(movimiento.id)}
                        className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white"
                      >
                        Eliminar
                      </button>
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

export default EmpleadoMove