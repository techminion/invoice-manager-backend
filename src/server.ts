import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import invoiceRoutes from "./routes/invoices";
import { generateDummyData } from "./utils/dummyData";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(errorHandler);

// Routes
app.get("/", (req, res) => {
  res.send("Invoice Management System API is running!");
});

app.use("/api/invoices", invoiceRoutes);

// Generate dummy data
generateDummyData();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
