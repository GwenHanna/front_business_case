import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { categoryInterface } from 'src/app/entities/categoryInterface';
import { SectionService } from 'src/app/services/section.service';
import { serviceInterface } from 'src/app/entities/serviceInterface';
import { ArticleService } from 'src/app/services/serviceArticle.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  form!: FormGroup;
  public categories: categoryInterface[] = [];
  public messageSuccess: string = '';
  public displayUpDate: boolean = false;
  private pathUri = 'api/sections/';

  constructor(
    private fb: FormBuilder,
    private sectionService: SectionService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getServices();
    this.form = this.fb.group({
      name: [null, Validators.required],
    });
  }

  getServices() {
    this.sectionService.getSection();
    this.sectionService.$section.subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log(categories);
      },
      error: (err) => console.log(err),
    });
  }

  getCategories() {
    this.sectionService.getSection();
    this.sectionService.$section.subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => console.log(err),
    });
  }

  deleteCategory(servicesId: number | undefined) {
    if (servicesId) {
      this.sectionService.deleteSection(servicesId).subscribe({
        error: (err) => console.log(err),
        complete: () => {
          this.messageSuccess = 'La categorie supprimmer';
          this.getCategories();
        },
      });
    }
  }

  showUpDate(servicesId: number | undefined) {
    this.displayUpDate = !this.displayUpDate;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);

      const name = this.form.value.name;

      this.sectionService.addSection({ name: name }).subscribe({
        next: (data) => {},
        error: (err) => (this.messageSuccess = err.statusText),
      });

      this.form.reset();
      this.getCategories();
    }
  }
}
