import { prestationInterface } from './prestationsInterface';

export interface serviceInterface {
  id?: number;
  name: string;
  description: string;
  price: number;
  picture: string;
  prestations?: prestationInterface;
  category: string;
}
