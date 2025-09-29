require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a MySQL");

    await sequelize.sync({ force: false });
    console.log("Tablas sincronizadas");

    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  } catch (err) {
    console.error("Error al conectar a MySQL:", err);
  }
})();
