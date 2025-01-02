
import fs from "fs";
import { productModel } from "../mongo/models/product.model.js";

export const addSeedProducts = async () => {
    const data = fs.readFileSync('./src/seed/data/products.json', 'utf-8');
    const products = JSON.parse(data);
    productModel.insertMany(products);
}


