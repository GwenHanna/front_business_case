import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-crud',
  templateUrl: './admin-crud.component.html',
  styleUrls: ['./admin-crud.component.css'],
})
export class AdminCrudComponent {
  isActive: boolean = false;
  toggleClass() {
    this.isActive = !this.isActive;
  }
}
