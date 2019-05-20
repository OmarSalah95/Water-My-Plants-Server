require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

app.use("/auth/", authRoutes);
app.use("/api/", userRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}.`);
});
