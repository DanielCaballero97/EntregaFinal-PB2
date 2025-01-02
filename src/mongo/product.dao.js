import { productModel } from "./models/Product.model.js";

class ProductDao {

    // Método para obtener todos los productos
  async getAll(query, options) {
    const products = await productModel.paginate(query, options);
    return products;
  }

   //Método para obtener por ID
  async getById(id) {
    const product = await productModel.findById(id);
    return product;
  }

  //Método para crear con la data recibida
  async create(data) {
    const product = await productModel.create(data);
    return product;
  }

  //Método para actualizar info de un producto ya creado
  async update(id, data) {
    const productUpdate = await productModel.findByIdAndUpdate(id, data, { new: true });
    return productUpdate;
  }

  //Método para borrar el producto con el id recibido
  async deleteOne(id) {
    const product = await productModel.findByIdAndUpdate(id, { status: false }, { new: true });
    return product;
  }
}

export const productDao = new ProductDao();