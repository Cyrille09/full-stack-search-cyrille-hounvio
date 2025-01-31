import "dotenv/config";
import express from "express";
import cors from "cors";
import statusMonitor from "express-status-monitor";
import { connectDatabase } from "./db/connect";
import v1HotelRoutes from "./routes/v1/hotelRouter";
import migrationRoutes from "./routes/migrationRouter";
import setupLogger from "./logger/logger";

const PORT = process.env.PORT || 3001;

// Connect to database
connectDatabase();
const app = express();
const { loggerMiddleware } = setupLogger();
const healthChecks = [
  {
    protocol: `${process.env.PROTOCOL}`,
    host: `${process.env.HOST}`,
    path: "/api/v1/hotels",
    port: `${PORT}`,
  },
];

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(
  statusMonitor({
    healthChecks,
    title: "API Status Monitor",
    path: "/status",
    spans: [
      { interval: 1, retention: 60 }, // 1 second intervals, 60 seconds of data
      { interval: 5, retention: 60 }, // 5 second intervals, 60 seconds of data
      { interval: 15, retention: 60 }, // 15 second intervals, 60 seconds of data
    ],
  })
);

app.use("/api/migration", migrationRoutes);
app.use("/api/v1/hotels", v1HotelRoutes);

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
