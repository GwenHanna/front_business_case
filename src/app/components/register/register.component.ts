import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable, map, switchMap } from 'rxjs';
import { RegisterForm } from '../../entities/registerForm';
import { NavigateService } from '../../services/navigate.service';
import { UserService } from 'src/app/services/user.service';
import { FormulaireService } from 'src/app/services/formulaire.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  formObservable$: Observable<RegisterForm> | undefined;
  messageError = '';
  isAdmin = false;

  // Initialisation des placeholder du formulaire
  placeholder: { [key: string]: string } = {
    email: 'Email',
    firstname: 'Prénom',
    lastname: 'Nom',
    birthdate: "Votre date d'anniversaire",
    street: 'Rue',
    city: 'Ville',
    zipcode: 'Code postal',
    gender: 'Sexe',
    password: 'Mot de passe',
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private navigateService: NavigateService,
    private formulaireService: FormulaireService
  ) {}

  ngOnInit(): void {
    this.authService.getIsAdmin().subscribe({
      next: (data) => {
        this.isAdmin = data;
      },
    });
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      plainPassword: ['', [Validators.required]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      birthdate: ['', [Validators.required]],
      gender: [''],
      street: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      roles: [''],
    });
  }

  onSubmit() {
    console.log(this.form.valid);
    let formData: RegisterForm;

    if (this.form.valid) {
      if (this.isAdmin === false) {
        formData = {
          ...this.form.value,
          roles: ['ROLE_USER'],
        };
      } else {
        formData = {
          ...this.form.value,
        };
      }
      this.userService.addUser(formData).subscribe({
        next: (data) => {
          console.log(data);

          this.navigateService.navigate('login');
        },
        error: (err) => {
          this.messageError = err;
          console.log(this.messageError);
        },
      });
      this.form.reset();
    }
  }
}
