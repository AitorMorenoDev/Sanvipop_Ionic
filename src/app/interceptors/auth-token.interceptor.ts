import { HttpInterceptorFn } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { from, switchMap } from 'rxjs';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  // from converts a Promise into an observable
  return from(Preferences.get({ key: 'fs-token' })).pipe(
    switchMap((token) => { // switchMap is necessary if it returns another observable or a promise
      //console.log(token);
      if (!token.value) {
        return next(req);
      }

      const authReq = req.clone({
        headers: req.headers.set('Authorization', `bearer ${token.value}`),
      });
      // Pass on the cloned request instead of the original request.
      return next(authReq);
    })
  );
};
