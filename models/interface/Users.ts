export interface IUser {
  _id?: string;
  name: string;
  password: string;
  email: string;
  role: Roles;
  verify: boolean;
}

export enum Roles {
  'admin',
  'seller',
  'deliverer',
  'buyer',
}
