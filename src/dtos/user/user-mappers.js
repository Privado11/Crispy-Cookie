const UserDto = require("./user-dto");

class UserMapper {
  static toDto(userEntity) {
    if (!userEntity) return null;
    return new UserDto({
      id: userEntity.id,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      email: userEntity.email,
      createdAt: userEntity.createdAt,
    });
  }

  static saveDtoToEntity(userSaveDto) {
    if (!userSaveDto) return null;
    return {
      firstName: userSaveDto.firstName,
      lastName: userSaveDto.lastName,
      email: userSaveDto.email,
      password: userSaveDto.password,
    };
  }

  static toEntity(userDto) {
    if (!userDto) return null;
    return {
      id: userDto.id,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
    };
  }
}

module.exports = UserMapper;
