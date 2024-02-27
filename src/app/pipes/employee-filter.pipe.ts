import { Pipe, PipeTransform } from '@angular/core';
import { UserInterface } from '../entities/userInterface';

@Pipe({
  name: 'employeeFilter'
})
export class EmployeeFilterPipe implements PipeTransform {

  transform(users: UserInterface[]): UserInterface[] {
    return users.filter(user => user.roles.includes("ROLE_EMPLOYEE"))
  }

}
