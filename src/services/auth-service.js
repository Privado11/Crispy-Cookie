const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const UserMapper = require("../dtos/user/user-mappers");
const AppError = require("../utils/app-error");

class AuthService {
    static async register(userSaveDto) {
        const userEntity = UserMapper.saveDtoToEntity(userSaveDto);
      
        if (userEntity.password) {
          const salt = await bcrypt.genSalt(10);
          userEntity.password = await bcrypt.hash(userEntity.password, salt);
        }
      
        try {
          const newUser = await User.create(userEntity);
          return UserMapper.toDto(newUser);
        } catch (err) {
          if (err.name === "SequelizeUniqueConstraintError") {
            throw new AppError("El correo ya está registrado", 400);
          }
          throw err; 
        }
      }
      

  static async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new AppError("Usuario no encontrado", 404);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new AppError("Contraseña incorrecta", 401);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return {
      user: UserMapper.toDto(user),
      token,
    };
  }
}

module.exports = AuthService;
