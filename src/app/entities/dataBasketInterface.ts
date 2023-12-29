import { serviceTypesInterface } from './service_types';

export interface DataBasketInterface {
  id?: number;
  serviceTypeName?: string;
  serviceName: string;
  state?: string;
  note?: string;
  repassage?: boolean;
  price?: number;
}
