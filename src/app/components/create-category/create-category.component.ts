import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviceCategory: CategoryService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.serviceCategory.add(this.form.value).subscribe((res) => {});
    }
  }
}
