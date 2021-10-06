/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import { IUser } from '../models/interface/Users';

export const signToken = (users: IUser) => {
  return jwt.sign(
    { _id: users._id, name: users.name, email: users.email, role: users.role },
    `${process.env.JWT_SECRET}`,
    { expiresIn: '30d' }
  );
};
