const UserService = require("../services/user-service");
const UserSaveDto = require("../dtos/user/user-save-dto");

class UserController {
  static async create(req, res, next) {
    try {
      const dto = new UserSaveDto(req.body);
      const user = await UserService.create(dto);
      res.status(201).json(user);
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
      const dto = new UserSaveDto(req.body);
      const user = await UserService.update(req.params.id, dto);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      await UserService.delete(req.params.id);
      res.json({ message: "Usuario eliminado" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
