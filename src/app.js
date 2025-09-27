const express = require("express");
const userRoutes = require("./routes/user-routes");
const recipeRoutes = require("./routes/recipe-routes");

const app = express();
app.use(express.json());


app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);

module.exports = app;
