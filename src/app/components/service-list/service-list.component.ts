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
    this.sectionsService.fetchAllSection().subscribe({
      next: (data) => {
        data.forEach((section) => {
          this.sections.push(section);
        });

        this.isLoading = false;
      },
      error: (err) => console.log(err),
      complete: () => {},
    });
  }
}
