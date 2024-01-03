import { prestationInterface } from './prestationsInterface';
import { sectionInterface } from './sectionInterface';
import { serviceTypesInterface } from './service_types';

export interface serviceInterface {
  id?: number;
  name: string;
  description?: string;
  price?: number;
  picture?: string;
  serviceType?: serviceTypesInterface;
  section?: sectionInterface;
}
