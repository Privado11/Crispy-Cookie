const AuthService = require("../services/auth-service");

class AuthController {
  static async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user); 
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      res.json({ user, token }); 
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
