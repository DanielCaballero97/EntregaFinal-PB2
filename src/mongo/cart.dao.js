import { cartModel } from "./models/Cart.model.js";

class CartDao {
  // Método para obtener todos los carritos
  async getAll() {
    const carts = await cartModel.find();
    return carts;
  }

  // Método para obtener un carrito por su ID
  async getById(id) {
    const cart = await cartModel.findById(id);
    return cart;
  }

  // Método para crear un nuevo carrito
  async create() {
    const cart = await cartModel.create({});
    return cart;
  }

  // Método para actualizar un carrito por su ID
  async update(id, data) {
    const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
    return cartUpdate;
  }

  // Método para eliminar un carrito por su ID
  async deleteOne(id) {
    const cart = await cartModel.deleteOne({ _id: id });
    return cart;
  }

  // Método para agregar un producto a un carrito
  async addProductToCart(cid, pid) {
    const cart = await cartModel.findById(cid);

    await cart.save(); 
    return cart;
  }

}

export const cartDao = new CartDao();

