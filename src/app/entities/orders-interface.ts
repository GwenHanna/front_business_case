import { UserInterface } from "./userInterface";

export interface OrdersInterface {
  id?: number;
  status?: string;
  payementDate?: Date;
  depotDate?: Date;
  pickUpDate?: Date;
  user?: UserInterface;
}
