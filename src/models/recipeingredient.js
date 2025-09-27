'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RecipeIngredient extends Model {
    static associate(models) {
      RecipeIngredient.belongsTo(models.Recipe, { foreignKey: 'recipeId' });
      RecipeIngredient.belongsTo(models.Ingredient, { foreignKey: 'ingredientId' });
    }
  }
  RecipeIngredient.init(
    {
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'RecipeIngredient',
      tableName: 'recipe_ingredients',
      timestamps: true,
    }
  );
  return RecipeIngredient;
};
