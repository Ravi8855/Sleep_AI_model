const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const connectDB = require("./config/db");
const requestLogger = require("./middleware/requestLogger");

const app = express();

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later."
  }
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.options("*", cors());

// Request logging
app.use(requestLogger);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect MongoDB
connectDB();

// Import routes
const authRoutes = require("./routes/auth");
const sleepRoutes = require("./routes/sleep");
const trendRoutes = require("./routes/trends");
const goalsRoutes = require("./routes/goals");
const adviceRoutes = require("./routes/advice");


// Mount routes (IMPORTANT)
app.use("/api/auth", authRoutes);
app.use("/api/sleep", sleepRoutes);
app.use("/api/trends", trendRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/advice", adviceRoutes);


// Error handler middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.listen(process.env.PORT || 4000, () => console.log(`Node API running on port ${process.env.PORT || 4000}`));
