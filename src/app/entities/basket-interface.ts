import { articleInterface } from './articleInterface';
import { prestationInterface } from './prestationsInterface';
import { serviceInterface } from './serviceInterface';

export interface BasketInterface {
  id?: number;
  article: articleInterface;
  priceTotal: number;
  quantity: number;
}
