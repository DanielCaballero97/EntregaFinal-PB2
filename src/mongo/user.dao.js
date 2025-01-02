import { userModel } from "./models/user.model.js";

class UserDao {

   // Método para obtener todos los Usuarios
  async getAll() {
    const users = await userModel.find();
    return users;
  }

   //Método para obtener por ID
  async getById(id) {
    const user = await userModel.findById(id);
    return user;
  }

     //Método para obtener por Email
  async getByEmail(email) {
    const user = await userModel.findOne({ email });
    return user;
  }

    //Método para crear con la data recibida
  async create(data) {
    const user = await userModel.create(data);
    return user;
  }

   //Método para actualizar info de un producto ya creado
  async update(id, data) {
    const userUpdate = await userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return userUpdate;
  }

   //Método para borrar el producto con el id recibido
  async deleteOne(id) {
    const user = await userModel.deleteOne({ _id: id });
    return user;
  }
}

export const userDao = new UserDao();
