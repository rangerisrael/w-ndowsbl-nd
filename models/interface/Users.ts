export interface IUser {
  _id?: string;
  name: string;
  password: string;
  email: string;
  role: Roles;
  verify: boolean;
  code: number;
}

export enum Roles {
  'admin',
  'seller',
  'deliverer',
  'buyer',
}
