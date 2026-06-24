import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 1,
      maxlength: 30,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 1,
      maxlength: 30,
    },
    role: {
      type: String,
      enum: ["teacher", "student"],
      default: "student",
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password during login
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}
;
export const User = mongoose.model("User", userSchema);
