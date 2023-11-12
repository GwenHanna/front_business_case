import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { prestationInterface } from '../entities/prestationsInterface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { articleInterface } from '../entities/articleInterface';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css'],
})
export class PrestationComponent implements OnInit {
  prestationsArticles: articleInterface[] = [];
  serviceName = '';
  id$ = new Observable();

  constructor(
    private serviceService: ServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id'))
    );

    this.id$.subscribe({
      next: (data: any) => {
        this.prestationsArticles = [];
        this.displayPrestation(data);
      },
    });
  }

  displayPrestation(id: string) {
    this.serviceService.fetchByNameSercice(id).subscribe({
      next: (data) => {
        data.forEach((data) => {
          this.serviceName = data.service.name;
          this.prestationsArticles.push(data.article);
          console.log(data);
          
        });
      },
      error: (err) => console.log(err),
    });
  }
}
