import { sectionInterface } from './sectionInterface';

export interface serviceTypesInterface {
  id?: number;
  name: string;
  description: string;
  picture: string;
  section?: sectionInterface;
}
