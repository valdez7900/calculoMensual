import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EmpleadoWatch = () => {
    const sueldoBase = 30;
    const jornadaLaboral = 8;

    const porEntrega = 5;
    
    const bonoChoferes = 10;
    const bonoCargadores = 5;

    const isr = 0.09;
    const isrAdicional = 0.12;

    const vales = 0.04;

    const diasMes= 30;

    const [nombreEmpleado, setNombre] = useState("");
    const [rolEmpleado, setRol] = useState("");
    const [tipoEmpleado, setTipo] = useState("");
    const [cantidadEntregas, setEntregas] = useState("0");
    

    const [mesNormal, setMesNormal] = useState("");
    const [bonoMes, setBonoMes] = useState("");
    const [mesConBono, setMesConBono] = useState("");
    const [bonoEntrega, setBonoEntrega] = useState("0");
    const [bonoCubrir, setBonoCubrir] = useState("0");
    const [isrRetenido, setIsrRetenido] = useState("0");
    const [mesCompleto, setMesCompleto] = useState("0");
    const [vale, setVale] = useState("0");
    const [neto, setNeto] = useState("0");

    const [cubrioA, setCubrioA] = useState("0");

    const { id } = useParams();
  
    useEffect(() => {
      const getEmpleadoById = async () => {
        const response = await axios.get(`http://localhost:5000/empleados/${id}`);
        setNombre(response.data.nombreEmpleado);
        setRol(response.data.rolEmpleado);
        setTipo(response.data.tipoEmpleado);
      };

      const getCargasById = async () => {
        const response = await axios.get(`http://localhost:5000/movimientoss/${id}`);
        setEntregas(response.data[0].cantidad);
        setCubrioA(response.data[0].cubrioA);
      };

      function calculos() {
        var bonoMes = 0;
        var diaNormal = sueldoBase * jornadaLaboral;
        var mesNormal = diaNormal * diasMes;
        setMesNormal(mesNormal);

        if (rolEmpleado === "Chofer") {
            bonoMes = (bonoChoferes * jornadaLaboral) * diasMes;
            setBonoMes(bonoMes);
        }

        if (rolEmpleado === "Cargador") {
            bonoMes = (bonoCargadores * jornadaLaboral) * diasMes;
            setBonoMes(bonoMes);
        }

        if (rolEmpleado === "Auxiliar") {
            if (cubrioA === "Chofer") {
                bonoMes = (bonoChoferes * jornadaLaboral) * diasMes;
                setBonoCubrir(bonoMes);
            }
            if (cubrioA === "Cargador") {
                bonoMes = (bonoCargadores * jornadaLaboral) * diasMes;
                setBonoCubrir(bonoMes);
            }
        }else{
            setBonoCubrir("0");
        }

        setMesConBono(mesNormal + bonoMes);

        if (cantidadEntregas !== 0) {
            setBonoEntrega(cantidadEntregas * porEntrega);
        }
        setMesCompleto(mesNormal + bonoMes + bonoEntrega);

        if (mesCompleto > 16000) {
            setIsrRetenido(mesCompleto * isrAdicional);
        }else{
            setIsrRetenido(mesCompleto * isr);
        }
        
        if (tipoEmpleado === "Interno") {
            setVale(mesCompleto * vales);
        }
        
        setNeto(mesCompleto - isrRetenido);
      }

      getEmpleadoById();
      getCargasById();
      calculos();
    }, [id, rolEmpleado, cantidadEntregas, cubrioA, bonoEntrega, mesCompleto, isrRetenido, tipoEmpleado]);
  
    return (
        <div className="mt-20 max-w-lg mx-auto my-10 bg-white p-4 rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl ">Vista <span className="text-blue-600 dark:text-blue-500">General</span></h1>
        <form className="my-10">
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-5">
              <label className="font-bold text-slate-700">Nombre del Empleado</label>
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
              <label className="font-bold text-slate-700">Entregas Totales</label>
              <input
                type="number"
                min="0"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Entregas Totales"
                value={cantidadEntregas}
                disabled
              />
            </div>

            <div className="mb-5">
            <label className="font-bold text-slate-700">Mes Normal</label>
              <input
                type="number"
                min="0"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Entregas Totales"
                value={mesNormal}
                disabled
              />
            </div>

            <div className="mb-5">
            <label className="font-bold text-slate-700">Bono del Mes</label>
              <input
                type="number"
                min="0"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Entregas Totales"
                value={bonoMes}
                disabled
              />
            </div>


            <div className="mb-5">
            <label className="font-bold text-slate-700">Mes con Bono</label>
              <input
                type="number"
                min="0"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Entregas Totales"
                value={mesConBono}
                disabled
              />
            </div>

            <div className="mb-5">
            <label className="font-bold text-slate-700">Bono por Entrega</label>
              <input
                type="number"
                min="0"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Entregas Totales"
                value={bonoEntrega}
                disabled
              />
            </div>

            <div className="mb-5">
            <label className="font-bold text-slate-700">Sueldo del Mes</label>
              <input
                type="number"
                min="0"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Entregas Totales"
                value={mesCompleto}
                disabled
              />
            </div>

            <div className="mb-5">
            <label className="font-bold text-slate-700">ISR Retenido</label>
              <input
                type="number"
                min="0"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Entregas Totales"
                value={isrRetenido}
                disabled
              />
            </div>

            <div className="mb-5">
            <label className="font-bold text-slate-700">Vale</label>
              <input
                type="number"
                min="0"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Entregas Totales"
                value={vale}
                disabled
              />
            </div>

            <div className="mb-5">
            <label className="font-bold text-slate-700">Bono por Cubrir (Auxiliar)</label>
              <input
                type="number"
                min="0"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Entregas Totales"
                value={bonoCubrir}
                disabled
              />
            </div>

            <div className="mb-5">
            <label className="font-bold text-slate-700">Salario Neto</label>
              <input
                type="number"
                min="0"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Entregas Totales"
                value={neto}
                disabled
              />
            </div>
            
          </div>
          
        </form>
      </div>
    );
}

export default EmpleadoWatch
