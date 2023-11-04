import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isConnect = authService.getIsLogged();
  isConnect.subscribe({
    next: (data) => {
      if (data) {
        router.navigateByUrl('/');
      }
    },
  });

  return true;
};
