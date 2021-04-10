import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
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
  password: {
    type: String,
    require: true,
    default: "",
  },
},
{
    timestamp:true,
});
// this will convert the schema into real table as the table name Admin_user
export const AdminUsers= mongoose.model("Admin_User", UserSchema);