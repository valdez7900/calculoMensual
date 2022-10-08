import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import EmpleadoRoute from "./routes/empleadoRoute.js";
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(EmpleadoRoute);

app.listen(process.env.APP_PORT, ()=>{
    console.log('SERVER CORRIENDO CORRECTAMENTE');
});