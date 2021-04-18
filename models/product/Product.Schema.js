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
      default: true,
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
    },
    qty: {
      type: Number,
      require: true,
      default: 0,
    },
    description: {
      type: String,
      require: true,
      default: 0,
    },
    thumbNail: {
      type: String,
    },
    images: {
      type: Array,
    },

    // childCats: [
    //   {
    //     name: {
    //       type: String,
    //       require: true,
    //       default: "",
    //     },
    //   },
    // ],
  },
  {
    timestamp: true,
  }
);

export const ProdSchema = mongoose.model("Product", ProductSchema);