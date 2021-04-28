import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      require: true,
      default: "",
    },
    lName: {
      type: String,
      require: true,
      default: "",
    },
    email: {
      type: String,
      require: true,
      default: "",
    },
    role: {
      type: String,
      require: true,
      default: "guest",
    },
    password: {
      type: String,
      require: true,
      default: "",
    },
    refreshJWT: {
      
      token: { type: String, require: true, default: "" },
      addedAt :{
        type:Date,
        require:true,
         
        default:Date.now(),
      }
    },
  },
  {
    timestamp: true,
  }
);
// this will convert the schema into real table as the table name users
export const AdminUsers = mongoose.model("User", UserSchema);
