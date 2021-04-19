import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      default: "",
    },
    status: {
      type: Boolean,
      require: true,
      default: false,
    },
    slug: {
      type: String,
      require: true,
      default: "",
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    salePrice: {
      type: Number,
    },
    saleEndDate: {
      type: Date,
      default:null,
    },
    qty: {
      type: Number,
      require: true,
      default: 0,
    },
    description: {
      type: String,
      require: true,
      default: "",
    },
    thumbNail: {
      type: String,
    },

    images: {
      type: Array,
    },
    categories: {
      type: Array,
    },

    
  },
  {
    timestamp: true,
  }
);

export const ProdSchema = mongoose.model("Product", ProductSchema);
