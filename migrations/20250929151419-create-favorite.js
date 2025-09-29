"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Favorites", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "recipes", key: "id" },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint("Favorites", {
      fields: ["userId", "recipeId"],
      type: "unique",
      name: "unique_user_recipe",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Favorites");
  },
};
