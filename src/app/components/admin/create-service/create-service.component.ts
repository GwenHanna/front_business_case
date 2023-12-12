import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, mergeMap, tap } from 'rxjs';
import { articleInterface } from 'src/app/entities/articleInterface';
import { categoryInterface } from 'src/app/entities/categoryInterface';
import { serviceInterface } from 'src/app/entities/serviceInterface';
import { ArticleService } from 'src/app/services/article.service';
import { SectionService } from 'src/app/services/section.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css'],
})
export class CreateServiceComponent implements OnInit {
  constructor(
    private serviceService: ServiceService,
    private sectionService: SectionService,
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {}

  // utils
  public messageSuccess: string = '';
  displayAddService: boolean = false;
  public categories: categoryInterface[] = [];
  public articles: articleInterface[] = [];
  public services: serviceInterface[] = [];

  // Up Date service
  public isEditor: boolean = false;
  public form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder();
    this.getService();
  }

  toggleAddService() {
    this.displayAddService = !this.displayAddService;
    if (this.displayAddService) {
      this.getCategoriesServices();
      this.getArticles();
    }
  }

  getService() {
    this.serviceService.getServices();
    this.serviceService.$services.subscribe({
      next: (services) => {
        console.log(services);
        this.services = services;
      },
      error: (err) => console.log(err),
    });
  }

  deleteService(servicesId: number | undefined) {
    const id: string = '' + servicesId;
    if (servicesId)
      this.serviceService.deleteService(id).subscribe({
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

  //     this.serviceService.addService(formData).subscribe({
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
      const articleId = this.form.get('articles')?.value;
      const pathArticles = `/api/articles/`;
      const uriArticles = articleId.map((data: any) => pathArticles + data);
      const formData = {
        ...this.form.value,
        articles: uriArticles,
        section: {
          name: this.form.value.category,
        },
      };

      this.serviceService.addService(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.messageSuccess = 'Service ajouté avec succès';
          this.updateSectionNewService(formData.section.name, data);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  updateSectionNewService(sectionName: string, newService: any) {
    // Récupérer la section correspondante par son nom
    this.sectionService.fetchByName(sectionName).subscribe({
      next: (section) => {
        // // Ajouter le nouveau service à la collection
        section.services = section[0].services;
        section.services.push(newService);

        console.log(section[0]);
        // Mettre à jour la section sur le serveur
        this.sectionService.upDateSection(section, 79).subscribe({
          next: (updatedSection) => {
            console.log('Section mise à jour :', updatedSection);
            this.getService();
          },
          error: (updateError) => {
            console.error(
              'Erreur lors de la mise à jour de la section :',
              updateError
            );
          },
        });
      },
      error: (fetchError) => {
        console.error(
          'Erreur lors de la récupération de la section :',
          fetchError
        );
      },
    });
  }

  formBuilder() {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.minLength(1)],
      picture: ['', Validators.required],
      category: ['', Validators.required],
      articles: this.fb.array([]),
    });
  }

  showUpDate(servicesId: number | undefined) {
    this.isEditor = true;
    if (servicesId) this.loadFormBuilder(servicesId);
  }
  closeUpDate() {}
  loadFormBuilder(articleId: number) {
    const id: string = '' + articleId;
    const pathUri = '/api/services/';
    let serviceUri: string[] = [];

    this.articleService.fetchById(id).subscribe({
      next: (data) => {
        this.form.patchValue({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category.id,
          picture: [''],
          services: data.services,
        });
      },
      error: (err) => console.log(err),
    });
  }

  // Récupération Data
  getCategoriesServices() {
    this.sectionService.$section.subscribe({
      next: (categories) => (this.categories = categories),
    });
  }
  getArticles() {
    this.articleService.$articles.subscribe({
      next: (articles) => (this.articles = articles),
      error: (err) => console.log(err),
    });
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
