import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { categoryInterface } from 'src/app/entities/categoryInterface';

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

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.form = this.fb.group({
      name: [null, Validators.required],
    });
  }

  getCategories() {
    this.categoryService.getCategories();
    this.categoryService.$categories.subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => console.log(err),
    });
  }

  deleteCategory(servicesId: number | undefined) {
    if (servicesId) {
      this.categoryService.deleteCategory(servicesId).subscribe({
        error: (err) => console.log(err),
        complete: () => (this.messageSuccess = 'La Categorie supprimmer'),
      });
    }
  }

  showUpDate(servicesId: number | undefined) {
    this.displayUpDate = !this.displayUpDate;
  }

  onSubmit() {
    if (this.form.valid) {
      this.categoryService.addCategory(this.form.value).subscribe((res) => {});
    }
  }
}
