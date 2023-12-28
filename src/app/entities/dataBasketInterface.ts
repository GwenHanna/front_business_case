import { serviceTypesInterface } from './service_types';

export interface DataBasketInterface {
  serviceTypeName?: string;
  serviceName: string;
  state?: string;
  note?: string;
  repassage?: boolean;
  price?: number;
}
