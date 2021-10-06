export interface IUser {
  _id?: string;
  name: string;
  password: string;
  email: string;
  role: Roles;
}

export enum Roles {
  'admin',
  'seller',
  'deliverer',
  'buyer',
}
