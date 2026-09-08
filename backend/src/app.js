import express from "express";
import cors from "cors";
import ticketRoutes from "./routes/ticketRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
  }),
);

app.use(express.json());

app.use("/api/tickets", ticketRoutes);

app.use(errorHandler);

export default app;
