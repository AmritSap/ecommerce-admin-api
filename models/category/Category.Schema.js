import mongoose from 'mongoose'

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      default: "",
    },
    parentCategory: {
      type: String,
      require: true,
      default: "",
    },
    // childCats: [
    //   {
    //     name: {
    //       type: String,
    //       require: true,
    //       default: "",
    //     }
    //   },
    // ],
  },
  {
    timestamp: true,
  }
);

export const CatSchema =mongoose.model("Category",CategorySchema)