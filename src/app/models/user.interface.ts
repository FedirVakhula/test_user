export interface User {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  type: UserType;
  password: string;
  id: string;
}

export enum UserType {
  Admin = 'admin',
  Driver = 'driver',
}
