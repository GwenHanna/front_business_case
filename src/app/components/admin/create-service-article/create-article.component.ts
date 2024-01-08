import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { articleInterface } from 'src/app/entities/articleInterface';
import { categoryInterface } from 'src/app/entities/categoryInterface';
import { serviceInterface } from 'src/app/entities/serviceInterface';
import { ArticleService } from 'src/app/services/serviceArticle.service';
import { CategoryService } from 'src/app/services/category.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent implements OnInit {
  // DATA
  categories: categoryInterface[] = [];
  services: serviceInterface[] = [];

  // Formulaire
  formAddArticle!: FormGroup;

  // Path
  pathPicture = '../../../../assets/articles/';
  pathUriServices = '/api/services/';

  //Utils
  messageSuccess = '';
  displayAddArticle: boolean = false;
  isEditor: boolean = false;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    // private categoryService: CategoryService,
    private servicesService: ServiceTypeService
  ) {}
  ngOnInit(): void {
    // this.getCategories();
    this.getServices();

    this.formAddArticle = this.buildFormBuilder();
  }

  // CRUD
  upDateArticle(article: articleInterface) {
    this.articleService.upDateArticle(article).subscribe({
      next: (data) =>
        (this.messageSuccess = 'Modification effectuer avec succès'),
      error: (err) => console.log(err),
    });
  }

  addArticle() {
    if (this.formAddArticle.valid) {
      console.log(this.formAddArticle.value);

      //     const selectService = this.formAddArticle.value.services;
      //     const serviceUri = selectService.map(
      //       (data: any) => this.pathUriServices + data
      //     );
      //     const categoryId = this.formAddArticle.get('category')?.value;
      //     const uriCategory = `/api/categories/${categoryId}`;
      //     const formData = {
      //       ...this.formAddArticle.value,
      //       category: uriCategory,
      //       services: serviceUri,
      //     };

      //     this.articleService.addArticle(formData).subscribe({
      //       next: (data) => this.getServices(),
      //       error: (err) => console.log(err),
      //       complete: () => {
      //         this.displayAddArticle = false;
      //         this.messageSuccess = 'Article ajouter avec succès';
      //       },
      //     });
    }
  }

  deleteArticle(articleId: number | undefined) {
    const id: string = '' + articleId;
    this.articleService.deleteArticle(id).subscribe({
      error: (err) => console.log(err),
      next: () => {
        this.messageSuccess = 'Article suprimmer avec succès !';
        this.getServices();
      },
    });
  }

  // UTILS
  toggleAddArticle() {
    this.displayAddArticle = !this.displayAddArticle;
    this.formAddArticle = this.buildFormBuilder();
  }
  showUpDate(idArticle: number | undefined) {
    console.log(idArticle);
    this.isEditor = true;

    // this.loadFormBuilder(idArticle);
  }
  closeUpDate() {
    this.isEditor = false;
    console.log(this.isEditor);
  }

  // getCategories() {
  //   this.categoryService.$categories.subscribe({
  //     next: (categories) => (this.categories = categories),
  //   });
  // }

  getServices() {
    this.servicesService.getServices();
    this.servicesService.$services.subscribe({
      next: (articles) => {
        this.services = articles;
        console.log(this.services);
      },
      error: (err) => console.log(err),
    });
  }
  toggleServiceChecked(serviceId: number | undefined): boolean | void {
    const selectService = this.formAddArticle.get('services') as FormArray;
    const pathService = '/api/services/';
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
    const selectedServices = this.formAddArticle.get('services');
    return !!selectedServices && selectedServices.value.includes(serviceId);
  }

  // INIT formulaire
  buildFormBuilder() {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: [''],
      picture: ['', Validators.required],
      services: this.fb.array([]),
    });
  }
  loadFormBuilder(articleId: number) {
    const id: string = '' + articleId;
    const pathUri = '/api/services/';
    let serviceUri: string[] = [];

    this.articleService.fetchById(id).subscribe({
      next: (data) => {
        this.formAddArticle.patchValue({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.section,
          picture: [''],
          services: data.serviceType,
        });
      },
    });
  }

  // Upload File
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    // this.formAddArticle.patchValue({
    //   file,
    // });
    if (file) {
      const formData = new FormData();
      formData.append('picture', file);
    }
    console.log(this.formAddArticle);
  }
}
