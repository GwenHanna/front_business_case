import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, mergeMap, tap } from 'rxjs';
import { articleInterface } from 'src/app/entities/articleInterface';
import { categoryInterface } from 'src/app/entities/categoryInterface';
import { serviceInterface } from 'src/app/entities/serviceInterface';
import { ArticleService } from 'src/app/services/serviceArticle.service';
import { SectionService } from 'src/app/services/section.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import { serviceTypesInterface } from 'src/app/entities/service_types';
import { sectionInterface } from 'src/app/entities/sectionInterface';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css'],
})

// CREATE SERVICE TYPES
export class CreateServiceComponent implements OnInit {
  constructor(
    private serviceTypesService: ServiceTypeService,
    private sectionService: SectionService,
    private fb: FormBuilder
  ) {}

  // Formulaire reactive form
  public form!: FormGroup;

  // utils
  public messageSuccess: string = '';
  public displayAddService: boolean = false;
  public servicesTypes: serviceTypesInterface[] = [];
  public sections: any[] = [];
  public pathSectionUri = 'api/sections/';

  // Up Date service
  public isEditor: boolean = false;

  ngOnInit(): void {
    this.form = this.formBuilder();
    this.getService();
  }

  toggleAddService() {
    this.displayAddService = !this.displayAddService;
  }

  // CRUD service_types
  getService() {
    this.serviceTypesService.getServices();
    this.serviceTypesService.$services.subscribe({
      next: (services) => {
        this.servicesTypes = services;
        const uniqueSections: sectionInterface[] = [];
        this.sections = services
          .map((services) => {
            return services.section;
          })
          .filter((section) => {
            if (section) {
              const isUnique = !uniqueSections.some((s) => s.id === section.id);
              if (isUnique) {
                uniqueSections.push(section);
                return true;
              }
            }
            return false;
          });
      },
      error: (err) => console.log(err),
    });
  }

  deleteService(servicesId: number | undefined) {
    const id: string = '' + servicesId;
    if (servicesId)
      this.serviceTypesService.deleteService(id).subscribe({
        error: (err) => console.log(err),
        complete: () => {
          this.messageSuccess = 'Service supprimer';
          this.getService();
        },
      });
  }

  // addService() {
  //   if (this.form.valid) {
  //     const articleId = this.form.get('articles')?.value;
  //     const pathArticles = `/api/articles/`;
  //     const uriArticles = articleId.map((data: any) => pathArticles + data);
  //     const formData = {
  //       ...this.form.value,
  //       articles: uriArticles,
  //       section: {
  //         name: this.form.value.category,
  //       },
  //     };

  //     this.serviceTypesService.addService(formData).subscribe({
  //       next: (data) => {
  //         console.log(data);
  //         this.messageSuccess = 'Service ajouté avec succès';
  //         this.getService();
  //       },
  //       error: (err) => {
  //         console.error(err);
  //         // Gérer l'erreur ici
  //       },
  //     });
  //   }
  // }

  addService() {
    if (this.form.valid) {
      const sectionId = this.form.get('section')?.value;
      const formData = {
        ...this.form.value,
        section: this.pathSectionUri + sectionId,
      };

      this.serviceTypesService.addService(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.messageSuccess = 'Service ajouté avec succès';
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.getService();
          this.displayAddService = false;
          this.form.reset();
        },
      });
    }
  }

  // INIT FORM BUILDER
  formBuilder() {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      picture: ['', Validators.required],
      section: ['', Validators.required],
    });
  }

  showUpDate(servicesId: number | undefined) {
    this.isEditor = true;
    //   if (servicesId) this.loadFormBuilder(servicesId);
  }
  closeUpDate() {
    this.isEditor = false;
  }
  // loadFormBuilder(articleId: number) {
  //   const id: string = '' + articleId;
  //   const pathUri = '/api/services/';
  //   let serviceUri: string[] = [];

  //   this.serviceTypesService.fetchById(id).subscribe({
  //     next: (data) => {
  //       this.form.patchValue({
  //         name: data.name,
  //         description: data.description,
  //         price: data.price,
  //         category: data.category.id,
  //         picture: [''],
  //         services: data.services,
  //       });
  //     },
  //     error: (err) => console.log(err),
  //   });
  // }

  // Récupération Data

  getServiceUri() {
    //   this.articleService.$articles.subscribe({
    //     next: (articles) => (this.articles = articles),
    //     error: (err) => console.log(err),
    //   });
  }

  toggleServiceChecked(serviceId: number | undefined): boolean | void {
    const selectService = this.form.get('articles') as FormArray;
    const pathService = '/api/articles/';
    const id: string = '' + serviceId;

    if (serviceId !== undefined) {
      if (selectService.value.includes(id)) {
        const index = selectService.value.indexOf(id);
        selectService.removeAt(index);
      } else {
        console.log(pathService + this.fb.control(id));

        selectService.push(this.fb.control(id));
      }
    }
  }
  isSelectedService(serviceId: number | undefined): boolean {
    const selectedServices = this.form.get('articles');
    return !!selectedServices && selectedServices.value.includes(serviceId);
  }

  // FILE

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    // this.form.patchValue({
    //   file,
    // });
    if (file) {
      const formData = new FormData();
      formData.append('picture', file);
    }
  }
}
