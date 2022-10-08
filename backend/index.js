import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import EmpleadoRoute from "./routes/empleadoRoute.js";
import MovimientoRoute from "./routes/movimientoRoute.js";
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(EmpleadoRoute);
app.use(MovimientoRoute);

app.listen(process.env.APP_PORT, ()=>{
    console.log('SERVER CORRIENDO CORRECTAMENTE');
});