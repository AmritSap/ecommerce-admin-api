import mongoose from "mongoose";

const SchemaResetPin = mongoose.Schema(
  {
    otp: {
      type: Number,
      require: true,
      default: "",
    },
 
    email: {
      type: String,
      require:true,
      default: "",

    },
  },
  {
    timestamp: true,
  }
);

const ResetSchema = mongoose.model("reset_pin", SchemaResetPin);

export default ResetSchema;
