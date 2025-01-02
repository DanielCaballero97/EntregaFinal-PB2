import { productDao } from "../mongo/product.dao.js";
import { ProductResponseDTO } from "../dto/productResponse.dto.js";

class ProductService {
    async getAll(query, options) {
        return await productDao.getAll(query, options);
  }


  async getById(id) {
    const product = await productDao.getById(id)
    if(!product) return null;
    const productFormat = new ProductResponseDTO(product)
    return productFormat;
  }


  async deleteOne(id) {
    const product = await productDao.getById(id)
    if(!product) return null;
    await productDao.deleteOne(id);
    return true
  }


  async update(id , data) {
    const product = await productDao.getById(id)
    if(!product) return null;

    const productUpdated = await productDao.update(id , data)
    return productUpdated;
  }

  
  async create(data) {
    const product = await productDao.create(data);
    return product;
  }
}

export const productService = new ProductService();