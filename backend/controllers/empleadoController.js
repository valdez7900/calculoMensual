import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const getEmpleados = async (req, res) =>{
    try {
        const response = await prisma.empleado.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getEmpleadoById = async (req, res) =>{
    try {
        const response = await prisma.empleado.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const createEmpleado= async (req, res) =>{
    const {nombreEmpleado, rolEmpleado, tipoEmpleado} = req.body;
    try {
        const empleado = await prisma.empleado.create({
            data:{
                nombreEmpleado: nombreEmpleado,
                rolEmpleado: rolEmpleado,
                tipoEmpleado: tipoEmpleado
            }
        });
        res.status(201).json(empleado);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateEmpleado = async (req, res) =>{
    const {nombreEmpleado, rolEmpleado, tipoEmpleado} = req.body;
    try {
        const empleado = await prisma.empleado.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                nombreEmpleado: nombreEmpleado,
                rolEmpleado: rolEmpleado,
                tipoEmpleado: tipoEmpleado
            }
        });
        res.status(200).json(empleado);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteEmpleado = async (req, res) =>{
    try {
        const empleado = await prisma.empleado.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(200).json(empleado);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}