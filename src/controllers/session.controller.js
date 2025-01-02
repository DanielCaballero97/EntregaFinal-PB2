import { createToken, verifyToken } from "../utils/jwt.js";
import { UserResponseDto } from "../dto/user.dto.js";
import { userDao } from "../mongo/user.dao.js";



export class SessionController {

  
  async register (req, res) {
    try {
      res.status(201).json({ status: "success", msg: "Usuario Registrado" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async login (req, res)  {
    try {
      // Generamos el token
      const token = createToken(req.user);
  
      // Guardamos el token en una cookie
      res.cookie("token", token, { httpOnly: true });
  
      res.status(200).json({ status: "success", payload: req.user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async logout (req, res)  {
    try {
      //borra la session actual
      req.session.destroy();
      res.status(200).json({ status: "success", msg: "Session cerrada" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async current (req, res) {
    try {
      const user = await userDao.getById(req.user.id);
      //se modifica la data para enviar menos datos
      const userFormat = new UserResponseDto(user)
      res.status(200).json({ status: "success", payload: userFormat });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }
}