import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { articleInterface } from 'src/app/entities/articleInterface';
import { categoryInterface } from 'src/app/entities/categoryInterface';
import { serviceInterface } from 'src/app/entities/serviceInterface';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { CrudService } from 'src/app/services/crud.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent implements OnInit {
  @Input() isActive: boolean = false;

  formAddArticle!: FormGroup;
  categories: categoryInterface[] = [];
  services: serviceInterface[] = [];
  articles: articleInterface[] = [];
  pathPicture = '../../../../assets/articles/crud/';
  pathUriServices = '/api/services/';
  messageSuccess = '';
  displayAddArticle: boolean = false;
  isEditor: boolean = false;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private servicesService: ServiceService,
    private crudService: CrudService
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.getServices();
    this.formAddArticle = this.buildFormBuilder();
    this.getArticle();
    console.log(this.isActive);
  }

  upDateArticle(article: articleInterface) {
    this.articleService.upDateArticle(article).subscribe({
      next: (data) =>
        (this.messageSuccess = 'Modification effectuer avec succès'),
      error: (err) => console.log(err),
    });
  }

  addArticle() {
    if (this.formAddArticle.valid) {
      const selectService = this.formAddArticle.value.services;
      const serviceUri = selectService.map(
        (data: any) => this.pathUriServices + data
      );
      const categoryId = this.formAddArticle.get('category')?.value;
      const uriCategory = `/api/categories/${categoryId}`;
      const formData = {
        ...this.formAddArticle.value,
        category: uriCategory,
        services: serviceUri,
      };

      this.articleService.addArticle(formData).subscribe({
        next: (data) => this.getArticle(),
        error: (err) => console.log(err),
        complete: () => {
          this.displayAddArticle = false;
          this.messageSuccess = 'Article ajouter avec succès';
        },
      });
    }
  }

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

  toggleAddArticle() {
    this.displayAddArticle = !this.displayAddArticle;
    this.formAddArticle = this.buildFormBuilder();
    console.log(this.isEditor);
    console.log(this.displayAddArticle);
  }
  showUpDate(idArticle: number) {
    this.isEditor = true;
    console.log(this.isEditor);
    console.log(this.displayAddArticle);

    this.loadFormBuilder(idArticle);
  }
  closeUpDate() {
    this.isEditor = false;
  }

  deleteArticle(articleId: number) {
    const id: string = '' + articleId;
    this.articleService.removeArticle(id).subscribe({
      error: (err) => console.log(err),
      next: () => {
        this.messageSuccess = 'Article suprimmer avec succès !';
        this.getArticle();
      },
    });
  }

  getArticle() {
    this.articleService.getArticles();
    this.articleService.$articles.subscribe({
      next: (data) => {
        console.log('data', data);
        this.articles = data;
      },
    });
  }

  getCategories() {
    this.categoryService.fetchAll().subscribe({
      next: (categories) => (this.categories = categories),
    });
  }
  getServices() {
    this.servicesService.fetchAllService().subscribe({
      next: (services) => (this.services = services),
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
          category: data.category.id,
          picture: [''],
          services: data.services,
        });
      },
    });
  }
}
