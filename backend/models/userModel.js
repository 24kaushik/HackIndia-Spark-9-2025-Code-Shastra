import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true, minlength: 10, maxlength: 10 },
  password: { type: String, required: true, minlength: 6 },
  rooms: [
    {
      room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
      }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});


// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password for login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
