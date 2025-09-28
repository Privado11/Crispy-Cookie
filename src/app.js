const express = require("express");
const userRoutes = require("./routes/user-routes");
const recipeRoutes = require("./routes/recipe-routes");
const errorHandler = require("./middlewares/error-handler");

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);

app.use(errorHandler);

module.exports = app;
