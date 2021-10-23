/* eslint-disable import/no-unresolved */
import mongoose from 'mongoose';
import { Roles } from './interface/Users';

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    oldpassword: { type: String, required: true, default: null },
    verify: { type: Boolean, required: true, default: false },
    code: { type: Number, required: true, unique: true },
    role: { type: String, required: true, default: Roles.buyer },
  },
  {
    timestamps: true,
  }
);

usersSchema.path('_id');

const Users = mongoose.models.Users || mongoose.model('Users', usersSchema);
export default Users;
