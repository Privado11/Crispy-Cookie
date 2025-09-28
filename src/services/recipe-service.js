const { Recipe, User, Ingredient, RecipeIngredient } = require("../models");
const RecipeMapper = require("../dtos/recipe/recipe-mappers");
const { Op } = require("sequelize");
const AppError = require("../utils/app-error");

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
          quantity: ing.quantity,
        });
      }
    }

    const createdRecipe = await Recipe.findByPk(recipe.id, {
      include: [
        { model: User },
        { model: Ingredient, through: { attributes: ["quantity"] } },
      ],
    });

    return RecipeMapper.toDto(createdRecipe);
  }

  static async update(id, recipeSaveDto, currentUserId) {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) throw new AppError("Receta no encontrada", 404);
    if (recipe.userId !== currentUserId) {
      throw new AppError("No autorizado para editar esta receta", 403);
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
          quantity: ing.quantity,
        });
      }
    }

    const updatedRecipe = await Recipe.findByPk(id, {
      include: [
        { model: User },
        { model: Ingredient, through: { attributes: ["quantity"] } },
      ],
    });

    return RecipeMapper.toDto(updatedRecipe);
  }

  static async getAll() {
    const recipes = await Recipe.findAll({
      include: [
        { model: User },
        { model: Ingredient, through: { attributes: ["quantity"] } },
      ],
    });
    return recipes.map((recipe) => RecipeMapper.toDto(recipe));
  }

  static async getById(id) {
    const recipe = await Recipe.findByPk(id, {
      include: [
        { model: User },
        { model: Ingredient, through: { attributes: ["quantity"] } },
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
    const recipes = await Recipe.findAll({
      include: [
        { model: User },
        {
          model: Ingredient,
          through: { attributes: ["quantity"] },
          required: false 
        }
      ],
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
          { "$Ingredients.name$": { [Op.like]: `%${query}%` } }
        ]
      },
      subQuery: false 
    });
  
    return recipes.map((r) => RecipeMapper.toDto(r));
  }
  
  
}

module.exports = RecipeService;
