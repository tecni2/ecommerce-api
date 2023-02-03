const AuthServices = require("../services/auth.services");
const transporter = require("../utils/mailer");

const register = async (req, res) => {
  try {
    const user = req.body;
    const result = await AuthServices.register(user);
    if (result) {
      res.status(201).json({ message: "user created" });
      await transporter.sendMail({
        from: "tecni2.elie.elie@gmail.com",
        to: result.email,
        subject: "Email confirmation",
        html: "<h1>Bienvenido a la app de chat creada por mi</h1> <p>Tienes que confirmar tu email</p> <p>Solo haz click en el siguiente <a target='new_blank' href='#'>enlace</a></p>",
      });
    } else {
      res.status(400).json({ message: "something wrong" })
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not email provided",
      })
    } else if (!password) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not password provided",
      })
    }
    const result = await AuthServices.login(password, email);
    if (result.isValid) {
      const { username, id, email } = result.user;
      const userData = { username, id, email };
      const token = AuthServices.genToken(userData);
      result.user.dataValues.token = token;
      res.json(result.user);
    } else {
      res.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Something wrong" });
  }
}

module.exports = {
  register,
  login,
}