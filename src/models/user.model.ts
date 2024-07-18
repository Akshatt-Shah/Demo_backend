import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "default.jfif",
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} Does Not A Valid Role",
      },
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", UserSchema);
export { User };
