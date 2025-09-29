const express = require("express");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const recipeRoutes = require("./routes/recipe-routes");
const commentRoutes = require("./routes/comment-routes");
const ratingRoutes = require("./routes/rating-routes");
const favoriteRoutes = require("./routes/favorite-routes");
const errorHandler = require("./middlewares/error-handler");

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/recipes", commentRoutes);
app.use("/api/v1/recipes", ratingRoutes);
app.use("/api/v1/favorites", favoriteRoutes);


app.use(errorHandler);

module.exports = app;
