import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const onlyLoggedUserGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router)
  
  if (auth.token) return true;

  const newPath = router.parseUrl("/");
  return new RedirectCommand(newPath, {
    skipLocationChange: true,
  });
};
