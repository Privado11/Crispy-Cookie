const UserService = require("../services/user-service");

class UserController {
  static async getAll(req, res, next) {
    try {
      const users = await UserService.getAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const user = await UserService.getById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const user = await UserService.update(req.params.id, req.body, req.userId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      await UserService.delete(req.params.id, req.userId);
      res.json({ message: "Usuario eliminado" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;