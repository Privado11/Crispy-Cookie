const {
  Recipe,
  User,
  Ingredient,
  RecipeIngredient,
  RecipeRating,
  RecipeComment,
} = require("../models");
const RecipeMapper = require("../dtos/recipe/recipe-mappers");
const RecipeSaveDto = require("../dtos/recipe/recipe-save-dto");
const { Op } = require("sequelize");
const AppError = require("../utils/app-error");

class RecipeService {
  static async create(recipeData, userId) {
    if (!userId) {
      throw new AppError("Usuario no autenticado", 401);
    }

    const recipeSaveDto = new RecipeSaveDto({
      ...recipeData,
      userId: userId,
    });
    const recipeEntity = RecipeMapper.saveDtoToEntity(recipeSaveDto);

    const recipe = await Recipe.create(recipeEntity);

    if (recipeEntity.ingredients?.length > 0) {
      await Promise.all(
        recipeEntity.ingredients.map(async (ing) => {
          let ingredient;

          if (ing.ingredientId) {
            ingredient = await Ingredient.findByPk(ing.ingredientId);
          }

          if (!ingredient) {
            [ingredient] = await Ingredient.findOrCreate({
              where: { name: ing.name },
            });
          }

          await RecipeIngredient.upsert({
            recipeId: recipe.id,
            ingredientId: ingredient.id,
            quantity: ing.quantity,
          });
        })
      );
    }

    await recipe.reload({
      include: [
        { model: User },
        {
          model: Ingredient,
        },
      ],
    });

    return RecipeMapper.toDto(recipe);
  }

  static async update(id, recipeData, currentUserId) {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) throw new AppError("Receta no encontrada", 404);
    if (recipe.userId !== currentUserId) {
      throw new AppError("No autorizado para editar esta receta", 403);
    }

    delete recipeData.userId;
    const recipeSaveDto = new RecipeSaveDto(recipeData);
    const recipeEntity = RecipeMapper.saveDtoToEntity(recipeSaveDto);

    await Recipe.update(recipeEntity, { where: { id } });

    if (recipeEntity.ingredients?.length > 0) {
      await RecipeIngredient.destroy({ where: { recipeId: recipe.id } });

      await Promise.all(
        recipeEntity.ingredients.map(async (ing) => {
          let ingredient;

          if (ing.ingredientId) {
            ingredient = await Ingredient.findByPk(ing.ingredientId);
          }

          if (!ingredient) {
            [ingredient] = await Ingredient.findOrCreate({
              where: { name: ing.name },
            });
          }

          await RecipeIngredient.create({
            recipeId: recipe.id,
            ingredientId: ingredient.id,
            quantity: ing.quantity,
          });
        })
      );
    }

    await recipe.reload({
      include: [{ model: User }, { model: Ingredient }],
    });

    return RecipeMapper.toDto(recipe);
  }

  static async getAll() {
    const recipes = await Recipe.findAll({
      include: [
        { model: User },
        { model: Ingredient },
        { model: RecipeRating, include: [{ model: User }] },
        {
          model: RecipeComment,
          include: [{ model: User }],
        },
      ],
    });

    return recipes.map((recipe) => RecipeMapper.toDto(recipe));
  }

  static async getById(id) {
    const recipe = await Recipe.findByPk(id, {
      include: [
        { model: User },
        { model: Ingredient },
        { model: RecipeRating },
        { model: RecipeComment },
      ],
    });
    if (!recipe) throw new AppError("Receta no encontrada", 404);
    return RecipeMapper.toDto(recipe);
  }

  static async delete(id, currentUserId) {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) throw new AppError("Receta no encontrada", 404);
    if (recipe.userId !== currentUserId) {
      throw new AppError("No autorizado para eliminar esta receta", 403);
    }
    await recipe.destroy();
    return true;
  }

  static async search(query) {
    const recipesByTitleDesc = await Recipe.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
        ],
      },
      attributes: ["id"],
    });

    const recipesByIngredients = await Recipe.findAll({
      include: [{ model: Ingredient }],
      attributes: ["id"],
    });

    const allRecipeIds = [
      ...recipesByTitleDesc.map((r) => r.id),
      ...recipesByIngredients.map((r) => r.id),
    ];

    const uniqueRecipeIds = [...new Set(allRecipeIds)];

    if (uniqueRecipeIds.length === 0) {
      return [];
    }

    const recipes = await Recipe.findAll({
      include: [{ model: User }, { model: Ingredient }],
      where: {
        id: { [Op.in]: uniqueRecipeIds },
      },
    });

    return recipes.map((r) => RecipeMapper.toDto(r));
  }
}

module.exports = RecipeService;
