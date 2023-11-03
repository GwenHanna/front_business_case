export interface RegisterForm {
  id?: number;
  email: string;
  firstname: string;
  lastname: string;
  plainPassword: string;
  birthdate: Date;
  gender: string;
  street: string;
  zipcode: string;
  city: string;
  roles?: string;
  dateCreated: Date;
}
