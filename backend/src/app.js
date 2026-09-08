import express from "express";
import ticketRoutes from "./routes/ticketRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());

app.use("/api/tickets", ticketRoutes);

app.use(errorHandler);

export default app;
