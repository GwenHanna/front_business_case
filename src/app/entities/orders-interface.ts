export interface OrdersInterface {
  id?: number;
  status?: string;
  payementDate?: Date;
  depotDate?: Date;
  pickUpDate?: Date;
  user?: {
    id?: number;
    name: string;
  };
  employee?: {
    id?: number;
    name: string;
  };
}
