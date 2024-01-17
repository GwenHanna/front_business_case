import { Component } from '@angular/core';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isHandset!: boolean;
  isTablet!: boolean;

  constructor(private reponsiveService: ResponsiveService) {
    this.reponsiveService.isHandset.subscribe({
      next: (data) => (this.isHandset = data),
    });
    reponsiveService.isTablet.subscribe({
      next: (data) => (this.isTablet = data),
    });
  }
}
