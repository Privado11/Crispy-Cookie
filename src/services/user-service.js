const { User } = require("../models");
const UserMapper = require("../dtos/user/user-mappers");
const UserSaveDto = require("../dtos/user/user-save-dto");
const bcrypt = require("bcrypt");
const AppError = require("../utils/app-error");

class UserService {
  static async getAll() {
    const users = await User.findAll();
    return users.map((user) => UserMapper.toDto(user));
  }

  static async getById(id) {
    const user = await User.findByPk(id);
    if (!user) throw new AppError("Usuario no encontrado", 404);
    return UserMapper.toDto(user);
  }

  static async update(id, data, currentUserId) {
    const user = await User.findByPk(id);
    if (!user) throw new AppError("Usuario no encontrado", 404);
    
  
    if (user.id !== currentUserId) {
      throw new AppError("No autorizado para editar este usuario", 403);
    }
  
    if (data.email) {
      const exists = await User.findOne({ where: { email: data.email } });
      if (exists && exists.id !== parseInt(id)) {
        throw new AppError("El email ya está en uso por otro usuario", 400);
      }
    }
  
    const userSaveDto = new UserSaveDto(data);
    const userEntity = UserMapper.saveDtoToEntity(userSaveDto);
  
    if (userEntity.password) {
      const salt = await bcrypt.genSalt(10);
      userEntity.password = await bcrypt.hash(userEntity.password, salt);
    }
  
    await User.update(userEntity, { where: { id } });
    const updatedUser = await User.findByPk(id);
    return UserMapper.toDto(updatedUser);
  }
  
  static async delete(id, currentUserId) {
    const user = await User.findByPk(id);
    if (!user) throw new AppError("Usuario no encontrado", 404);

   
    if (user.id !== currentUserId) {
      throw new AppError("No autorizado para eliminar este usuario", 403);
    }

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