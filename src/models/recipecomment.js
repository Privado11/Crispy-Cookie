"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecipeComment extends Model {
    static associate(models) {
      RecipeComment.belongsTo(models.User, { foreignKey: "userId" });
      RecipeComment.belongsTo(models.Recipe, { foreignKey: "recipeId" });
    }
  }
  RecipeComment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RecipeComment",
      tableName: "recipe_comments",
      timestamps: true,
    }
  );
  return RecipeComment;
};
