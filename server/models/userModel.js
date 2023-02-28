import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: [5, "Email must be at least 8 characters"],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Email must be at least 8 characters"],
  },
  userType: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  phoneNumber: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
