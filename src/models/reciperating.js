"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecipeRating extends Model {
    static associate(models) {
      RecipeRating.belongsTo(models.User, { foreignKey: "userId" });
      RecipeRating.belongsTo(models.Recipe, { foreignKey: "recipeId" });
    }
  }
  RecipeRating.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      recipeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
    },
    {
      sequelize,
      modelName: "RecipeRating",
      tableName: "recipe_ratings",
      timestamps: true,
    }
  );
  return RecipeRating;
};
