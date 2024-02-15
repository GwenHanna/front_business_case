import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { sectionInterface } from 'src/app/entities/sectionInterface';
import { serviceTypesInterface } from 'src/app/entities/service_types';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { SectionService } from 'src/app/services/section.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import { setServiceTypes } from 'src/app/store/actions/service-types.actions';

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

  serviceType: serviceTypesInterface[] = []
  sections: sectionInterface[] = []

  ngOnInit(): void {


  }
  title = 'app_clean_and_chic';


}
