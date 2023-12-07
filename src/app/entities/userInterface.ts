export interface UserInterface {
  id?: number;
  email: string;
  roles: string[];
  firstname: string;
  lastname: string;
  birthdate: Date;
  gender?: string;
  street: string;
  zipcode: string;
  city: string;
  dateCreated: Date;
  plainPassword?: string;
}
