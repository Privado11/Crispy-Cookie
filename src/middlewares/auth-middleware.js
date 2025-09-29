const jwt = require("jsonwebtoken");
const AppError = require("../utils/app-error");

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw new AppError("Token no proporcionado", 401);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new AppError("Token inválido", 401);
    }

  

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; 

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new AppError("El token ha expirado", 401));
    }
    if (err.name === "JsonWebTokenError") {
      return next(new AppError("Token inválido", 401));
    }

    return next(new AppError(err.message || "No autorizado", 401));
  }
}

module.exports = authMiddleware;
