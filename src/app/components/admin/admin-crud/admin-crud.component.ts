import { Component } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-admin-crud',
  templateUrl: './admin-crud.component.html',
  styleUrls: ['./admin-crud.component.css'],
})
export class AdminCrudComponent {
  constructor(public crudService: CrudService) {}
  toggleClass(section: string) {
    this.crudService.upDateActive(section);
  }
}
