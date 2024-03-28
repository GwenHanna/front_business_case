import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Création d'un formulaire reactive
  public form!: FormGroup;
  public messageError: string = '';
  public passwordView = false;

  public placeholder = {
    email: 'Email',
    password: 'Mot de passe',
  };

  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec l'ajout des Validators
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public get getEmail(): any {
    return this.form.get('email');
  }
  public get getPassword(): any {
    return this.form.get('password');
  }

  onLogin() {
    // Vérification de la validité du formulaire
    if (this.form.valid) {
      // Mon service LoginService fait une requête a mon api avec les valeurs du formulaire
      this.loginService.login(this.form.value).subscribe({
        next: (data) => {
          // Si la response ne m'envoie pas d'erreur je sauvegarde la token
          this.loginService.saveToken(data.token);
        },
        // Gestion des erreur avec un Interceptor
        error: (error: HttpResponse<any>) => {
          this.messageError = error.toString();
          console.log(error.toString());
        },
        complete: () => {
          this.router.navigateByUrl('/');
          this.loginService.setIsLogged(true);
        },
      });
    }
  }

  toggleViewPassword() {
    this.passwordView = !this.passwordView;
  }
}
