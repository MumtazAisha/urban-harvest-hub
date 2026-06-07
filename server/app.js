const express = require("express");
const cors = require("cors");

require("./database/db");

const productsRoutes = require("./routes/products");
const eventsRoutes = require("./routes/events");
const workshopsRoutes = require("./routes/workshops");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Urban Harvest Hub API is running",
  });
});

app.use("/products", productsRoutes);
app.use("/events", eventsRoutes);
app.use("/workshops", workshopsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});