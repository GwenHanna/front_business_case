import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { articleInterface } from 'src/app/entities/articleInterface';
import { categoryInterface } from 'src/app/entities/categoryInterface';
import { serviceInterface } from 'src/app/entities/serviceInterface';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent implements OnInit {
  formAddArticle!: FormGroup;
  categories: categoryInterface[] = [];
  services: serviceInterface[] = [];
  articles: articleInterface[] = [];
  pathPicture = '../../../../assets/articles/crud/';
  pathUriServices = '/api/services/';
  messageSuccess = '';
  displayAddArticle: boolean = false;
  displayUpdateArticle: boolean = false;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private servicesService: ServiceService
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.getServices();

    this.formAddArticle = this.buildFormBuilder();
    this.getArticle();
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
      console.log(formData);

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

  toggleAddArticle() {
    this.displayAddArticle = !this.displayAddArticle;
  }
  toggleUpDateArticle() {
    this.displayUpdateArticle = !this.displayUpdateArticle;
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
  toggleServiceChecked(serviceId: number | undefined) {
    const selectService = this.formAddArticle.get('services') as FormArray;
    const pathService = '/api/services/';
    const id: string = '' + serviceId;
    if (serviceId !== undefined) {
      if (selectService.value.includes(id)) {
        const index = selectService.value.indexOf(serviceId);
        selectService.removeAt(index);
      } else {
        console.log(pathService + this.fb.control(serviceId));

        selectService.push(this.fb.control(serviceId));
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
}
