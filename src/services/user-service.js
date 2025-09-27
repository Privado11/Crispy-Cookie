const { User } = require("../models");
const UserMapper = require("../dtos/user/user-mappers");
const bcrypt = require("bcrypt");

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
    return UserMapper.toDto(user);
  }

  static async update(id, userSaveDto) {
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
    const deleted = await User.destroy({ where: { id } });
    return deleted > 0;
  }

  static async validateCredentials(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? UserMapper.toDto(user) : null;
  }
}

module.exports = UserService;
