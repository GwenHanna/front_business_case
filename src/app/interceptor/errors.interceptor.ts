import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<string>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "Une erreur c'est produite.";
        let codeError = error.status;
        console.log('codeError', error);

        switch (codeError) {
          case 401:
            if (error.message) {
              errorMessage = 'Votre Email ou mot de passe est incorect';
            } else {
              errorMessage = "La page demandée n'a pas été trouveée.";
            }
            break;
          case 404:
            errorMessage = "La ressource demandée n'a pas été trouvée.";
            break;
          case 422:
            errorMessage = 'Cet Email éxiste déjà.';
            break;
          default:
            break;
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
