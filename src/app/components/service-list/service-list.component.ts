import { Component, OnInit } from '@angular/core';
import { serviceInterface } from '../../entities/serviceInterface';
import { ServiceService } from '../../services/service.service';
import { sectionInterface } from 'src/app/entities/sectionInterface';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  services: serviceInterface[] = [];
  sections: any = [];
  isLoading = false;

  constructor(private sectionsService: SectionService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.refreachService();
  }

  refreachService() {
    this.sectionsService.fetchAllSection().subscribe({
      next: (data) => {
        this.sections = data;
        this.isLoading = false;
      },
      error: (err) => console.log(err),
      complete: () => {},
    });
  }
}
