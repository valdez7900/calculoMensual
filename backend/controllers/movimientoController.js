import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const getMovimientos = async (req, res) =>{
    try {
        const response = await prisma.movimiento.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getMovimientoById = async (req, res) =>{
    try {
        const response = await prisma.movimiento.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const createMovimiento= async (req, res) =>{
    const {idEmpleado, cantidadEntregas, cubrioA} = req.body;
    try {
        const movimiento = await prisma.movimiento.create({
            data:{
                idEmpleado: idEmpleado,
                cantidadEntregas: cantidadEntregas,
                cubrioA: cubrioA
            }
        });
        res.status(201).json(movimiento);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateMovimiento = async (req, res) =>{
    const { cantidadEntregas, cubrioA } = req.body;
    try {
        const movimiento = await prisma.movimiento.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                cantidadEntregas: cantidadEntregas,
                cubrioA: cubrioA
            }
        });
        res.status(200).json(movimiento);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteMovimiento = async (req, res) =>{
    try {
        const movimiento = await prisma.movimiento.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(200).json(movimiento);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const getJustCargas = async (req, res) =>{
    try {
        const movimiento = await prisma.$queryRaw`SELECT SUM(cantidadEntregas) cantidad FROM movimiento WHERE idEmpleado = ${req.params.id}`;
        res.status(200).json(movimiento);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}