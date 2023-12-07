import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { articleInterface } from 'src/app/entities/articleInterface';
import { categoryInterface } from 'src/app/entities/categoryInterface';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent implements OnInit {
  formAddArticle!: FormGroup;
  categories: categoryInterface[] = [];
  articles: articleInterface[] = [];
  pathPicture = '../../../../assets/articles/crud/';
  messageSuccess = '';
  displayAddArticle: boolean = false;
  displayUpdateArticle: boolean = false;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.getArticle();
    this.formAddArticle = this.buildFormBulder();
  }

  addArticle() {
    if (this.formAddArticle.valid) {
      const categoryId = this.formAddArticle.get('category')?.value;
      const uriCategory = `/api/categories/${categoryId}`;
      const formData = { ...this.formAddArticle.value, category: uriCategory };
      this.articleService.addArticle(formData).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => console.log(err),
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
      next: () => (this.messageSuccess = 'Article suprimmer avec succès !'),
    });
  }

  getArticle() {
    this.articleService.fetchAllArticle().subscribe({
      next: (articles) => (this.articles = articles),

      error: (err) => console.log(err),
    });
  }

  getCategories() {
    this.categoryService.fetchAll().subscribe({
      next: (categories) => (this.categories = categories),
    });
  }

  buildFormBulder() {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: [''],
      picture: ['', Validators.required],
    });
  }
}
