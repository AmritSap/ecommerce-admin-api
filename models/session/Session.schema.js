import mongoose from "mongoose";

const sessionSchema = mongoose.Schema(
  {
    accessJWT: {
      type: String,
      require: true,
      default: "",
    },
    userId: {
      type:mongoose.Schema.ObjectId,
     default:null,
    },
    
  },
  {
    timestamp: true,
  }
);

const SchemaSession = mongoose.model("Session", sessionSchema);

export default SchemaSession;
