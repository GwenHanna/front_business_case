import { Component, OnInit } from '@angular/core';
import { sectionInterface } from 'src/app/entities/sectionInterface';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  sections: sectionInterface[] = [];
  isLoading = false;

  constructor(private sectionsService: SectionService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.refreachService();
  }

  refreachService() {
    this.sectionsService.getSection();
    this.sectionsService.$section.subscribe({
      next: (data) => {
        console.log(data);
        this.sections = data;
        this.isLoading = false;
      },
      error: (err) => console.log(err),
      complete: () => {},
    });
  }
}
