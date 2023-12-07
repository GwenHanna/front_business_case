import { categoryInterface } from './categoryInterface';

export interface articleInterface {
  id: number;
  name: string;
  description: string;
  state?: string;
  price: number;
  category: categoryInterface;
  picture?: string;
}
