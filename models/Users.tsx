/* eslint-disable import/no-unresolved */
import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'buyer' },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.models.Users || mongoose.model('Users', usersSchema);
export default Users;
