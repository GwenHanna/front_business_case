import { articleInterface } from './articleInterface';
import { serviceInterface } from './serviceInterface';

export interface prestationInterface {
  id: number;
  article: articleInterface;
  service: serviceInterface;
}
