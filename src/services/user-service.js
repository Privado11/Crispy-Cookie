const { User } = require("../models");
const UserMapper = require("../dtos/user/user-mappers");
const bcrypt = require("bcrypt");
const AppError = require("../utils/app-error");

class UserService {
  static async create(userSaveDto) {
    const userEntity = UserMapper.saveDtoToEntity(userSaveDto);

    if (userEntity.password) {
      const salt = await bcrypt.genSalt(10);
      userEntity.password = await bcrypt.hash(userEntity.password, salt);
    }

    const newUser = await User.create(userEntity);
    return UserMapper.toDto(newUser);
  }

  static async getById(id) {
    const user = await User.findByPk(id);
    if (!user) throw new AppError("Usuario no encontrado", 404);
    return UserMapper.toDto(user);
  }

  static async update(id, userSaveDto) {
    const user = await User.findByPk(id);
    if (!user) throw new AppError("Usuario no encontrado", 404);

    const userEntity = UserMapper.saveDtoToEntity(userSaveDto);

    if (userEntity.password) {
      const salt = await bcrypt.genSalt(10);
      userEntity.password = await bcrypt.hash(userEntity.password, salt);
    }

    await User.update(userEntity, { where: { id } });
    const updatedUser = await User.findByPk(id);
    return UserMapper.toDto(updatedUser);
  }

  static async delete(id) {
    const user = await User.findByPk(id);
    if (!user) throw new AppError("Usuario no encontrado", 404);

    await user.destroy();
    return true;
  }

  static async validateCredentials(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new AppError("Credenciales inválidas", 401);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new AppError("Credenciales inválidas", 401);

    return UserMapper.toDto(user);
  }
}

module.exports = UserService;
