import express from "express";
import ticketRoutes from "./routes/ticketRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api/tickets", ticketRoutes);

app.use(errorHandler);

export default app;
