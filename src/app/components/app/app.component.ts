import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isHandset!: boolean;
  isTablet!: boolean;

  constructor(private reponsiveService: ResponsiveService) {
    // Souscription aux observable du responsive
    this.reponsiveService.isHandset.subscribe({
      next: (data) => (this.isHandset = data),
    });
    reponsiveService.isTablet.subscribe({
      next: (data) => (this.isTablet = data),
    });
  }

  ngOnInit(): void {}
  title = 'app_clean_and_chic';
}
