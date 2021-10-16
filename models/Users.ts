/* eslint-disable import/no-unresolved */
import mongoose, { Schema } from 'mongoose';

const usersSchema = new mongoose.Schema(
  { 
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verify: { type: Boolean, required: true, default: false },
    code: { type: Number, required: true, unique: true },
    role: { type: String, required: true, default: 'buyer' },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.models.Users || mongoose.model('Users', usersSchema);
export default Users;
