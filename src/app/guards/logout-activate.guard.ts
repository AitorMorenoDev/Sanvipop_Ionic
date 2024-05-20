import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { map } from 'rxjs';

export const logoutActivateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthService)
    .isLogged()
    .pipe(
      map((logged) => {
        if (logged) {
          return router.createUrlTree(['/products']);
        }
        return true;
      })
    );
};
