import { prestationInterface } from './prestationsInterface';
import { sectionInterface } from './sectionInterface';

export interface serviceInterface {
  id?: number;
  name: string;
  description?: string;
  price?: number;
  picture?: string;
  prestations?: prestationInterface;
  category?: string;
  section?: sectionInterface;
}
