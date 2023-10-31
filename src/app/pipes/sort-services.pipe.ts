import { Pipe, PipeTransform } from '@angular/core';
import { serviceInterface } from '../entities/serviceInterface';

@Pipe({
  name: 'sortServices',
})
export class SortServicesPipe implements PipeTransform {
  transform(categories: any[]): any {
    return categories.sort((a, b) => {
      const order = ['nettoyage', 'soins', 'autre'];
      const indexA = order.indexOf(a.key);
      const indexB = order.indexOf(b.key);

      if (indexA < indexB) {
        return -1;
      } else if (indexA > indexB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
