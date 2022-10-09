import express from "express";
import {
    getMovimientos,
    getMovimientoById,
    createMovimiento,
    updateMovimiento,
    deleteMovimiento,
    getJustCargas
} from "../controllers/movimientoController.js";

const router = express.Router();

router.get('/movimientos', getMovimientos);
router.get('/movimientoss/:id', getJustCargas);
router.get('/movimientos/:id', getMovimientoById);
router.post('/movimientos', createMovimiento);
router.patch('/movimientos/:id', updateMovimiento);
router.delete('/movimientos/:id', deleteMovimiento);

export default router;