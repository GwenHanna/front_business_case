import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const registerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isConnect = authService.getIsLogged();
  const isAdmin = authService.getIsAdmin();

  isConnect.subscribe({
    next: (data) => {
      if (!isAdmin) {
        router.navigate(['/']);
      }
    },
  });
  return true;
};
