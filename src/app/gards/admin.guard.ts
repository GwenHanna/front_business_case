import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const autService = inject(AuthService);
  const router = inject(Router);

  const isAdmin = autService.getIsAdmin();

  isAdmin.subscribe({
    next: (data: any) => {
      if (!data) {
        router.navigateByUrl('/');
      }
    },
  });
  return true;
};
