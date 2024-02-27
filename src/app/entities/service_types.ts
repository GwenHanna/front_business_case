import { sectionInterface } from './sectionInterface';

export interface serviceTypesInterface {
  id?: number;
  name: string;
  description?: string;
  price?: number;
  picture?: string;
  serviceType?: serviceTypesInterface;
  section?: sectionInterface;
  icon?: string;
}
