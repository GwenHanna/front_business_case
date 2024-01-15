import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isHandset!: Observable<boolean>;
  isTablet!: Observable<boolean>;

  constructor(private reponsiveService: ResponsiveService) {
    this.isHandset = this.reponsiveService.isHandset;
    this.isTablet = reponsiveService.isTablet;
  }

  ngOnInit(): void {}
  title = 'app_clean_and_chic';
}
