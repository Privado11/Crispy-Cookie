const UserService = require("../services/user-service");
const UserSaveDto = require("../dtos/user/user-save-dto");

class UserController {
  static async create(req, res) {
    try {
      const dto = new UserSaveDto(req.body);
      const user = await UserService.create(dto);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    const user = await UserService.getById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  }

  static async update(req, res) {
    const dto = new UserSaveDto(req.body);
    const user = await UserService.update(req.params.id, dto);
    res.json(user);
  }

  static async delete(req, res) {
    const ok = await UserService.delete(req.params.id);
    if (!ok) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  }
}

module.exports = UserController;
