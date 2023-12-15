import { serviceInterface } from './serviceInterface';

export interface sectionInterface {
  id?: number;
  name?: string;
  serviceTypes?: serviceInterface[];
}
