import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
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
  passwordView = false;
  regexChar = /[!@#$%^&*(),.?":{}|<>]/;
  regexNum = /[0-9]/;
  regexMaj = /[A-Z]/;

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
      email: ['', [Validators.required, Validators.email]],
      plainPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          // Validators.pattern('^(?=.*[A-Z])[A-Za-z0-9]+$'),
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+$'
          ),
        ],
      ],
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
  toggleViewPassword() {
    this.passwordView = !this.passwordView;
  }
  onSubmit() {
    console.log(this.form.value);
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
    }
  }

  // Getters

  public get getEmail(): any {
    return this.form.get('email');
  }
  public get getPassword(): any {
    return this.form.get('plainPassword');
  }
  public get getLastname(): any {
    return this.form.get('lastname');
  }
  public get getFirstName(): any {
    return this.form.get('firstname');
  }
  public get getBirthdate(): any {
    return this.form.get('birthdate');
  }
  public get getGender(): any {
    return this.form.get('gender');
  }
  public get getStreet(): any {
    return this.form.get('street');
  }
  public get getZipcode(): any {
    return this.form.get('zipcode');
  }
  public get getCity(): any {
    return this.form.get('city');
  }
}
