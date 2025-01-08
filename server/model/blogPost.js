import mongoose from "mongoose";
import userModel from "./userSchema.js";

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    catergories: {
      type: String,
      required: true,
    },
    blog: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
      required:true
    },
  },
  { timeStamps: true }
);

const blogModel = mongoose.model("blogModel", blogSchema);
export default blogModel;
