import express from "express";
import ticketRoutes from "./routes/ticketRoutes.js";

const app = express();

app.use(express.json());

app.use("/tickets", ticketRoutes);

export default app;
