const { Recipe, User, Ingredient, RecipeIngredient } = require("../models");
const RecipeMapper = require("../dtos/recipe/recipe-mappers");
const { Op } = require("sequelize");

class RecipeService {
  static async create(recipeSaveDto) {
    const recipeEntity = RecipeMapper.saveDtoToEntity(recipeSaveDto);

    const recipe = await Recipe.create({
      title: recipeEntity.title,
      description: recipeEntity.description,
      image: recipeEntity.image,
      userId: recipeEntity.userId,
    });

    if (recipeEntity.ingredients && recipeEntity.ingredients.length > 0) {
      for (const ing of recipeEntity.ingredients) {
        let ingredient;

        if (ing.ingredientId) {
          ingredient = await Ingredient.findByPk(ing.ingredientId);
        }

        if (!ingredient) {
          ingredient = await Ingredient.findOne({ where: { name: ing.name } });
          if (!ingredient) {
            ingredient = await Ingredient.create({ name: ing.name });
          }
        }

        await RecipeIngredient.create({
          recipeId: recipe.id,
          ingredientId: ingredient.id,
          quantity: parseFloat(ing.quantity) || 0,
          unit: ing.unit,
        });
      }
    }

    const createdRecipe = await Recipe.findByPk(recipe.id, {
      include: [
        { model: User },
        { model: Ingredient, through: { attributes: ["quantity", "unit"] } },
      ],
    });

    return RecipeMapper.toDto(createdRecipe);
  }

  static async update(id, recipeSaveDto, currentUserId) {
    const recipe = await Recipe.findByPk(id);
    if (!recipe || recipe.userId !== currentUserId) {
      throw new Error("No autorizado para editar esta receta");
    }

    const recipeEntity = RecipeMapper.saveDtoToEntity(recipeSaveDto);

    await Recipe.update(
      {
        title: recipeEntity.title,
        description: recipeEntity.description,
        image: recipeEntity.image,
        userId: recipeEntity.userId,
      },
      { where: { id } }
    );

    if (recipeEntity.ingredients) {
      await RecipeIngredient.destroy({ where: { recipeId: id } });

      for (const ing of recipeEntity.ingredients) {
        let ingredient;

        if (ing.ingredientId) {
          ingredient = await Ingredient.findByPk(ing.ingredientId);
        }

        if (!ingredient) {
          ingredient = await Ingredient.findOne({ where: { name: ing.name } });
          if (!ingredient) {
            ingredient = await Ingredient.create({ name: ing.name });
          }
        }

        await RecipeIngredient.create({
          recipeId: id,
          ingredientId: ingredient.id,
          quantity: parseFloat(ing.quantity) || 0,
          unit: ing.unit,
        });
      }
    }

    const updatedRecipe = await Recipe.findByPk(id, {
      include: [
        { model: User },
        { model: Ingredient, through: { attributes: ["quantity", "unit"] } },
      ],
    });

    return RecipeMapper.toDto(updatedRecipe);
  }
}

module.exports = RecipeService;