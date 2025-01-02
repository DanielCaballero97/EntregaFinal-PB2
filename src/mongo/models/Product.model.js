import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const ProductSchema = new mongoose.Schema({

    title: String,
    description: String,
    price: Number,
    thumbnail: {
      type: Array,
      default: []
    },
    code: String,
    stock: Number,
    category: String,
    status: {
      type: Boolean,
      default: true
    }
})

ProductSchema.plugin(mongoosePaginate)
export const productModel = mongoose.model('Product', ProductSchema);