import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { tokenKey } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status != 403) {
          this.toastr.error('', 'Une erreur est survenue', {
            closeButton: true,
          });
          localStorage.removeItem(tokenKey);
        } else if (error instanceof HttpErrorResponse && error.status == 403 && new URL(request.url).pathname != '/login') {
          this.toastr.error('Veuillez vous connecter', 'Vous n\'êtes pas autorisé à accéder à cette page', {
            closeButton: true,
          });
          localStorage.removeItem(tokenKey);
          this.router.navigate(['profil']);
        }
        return throwError(error.message);
      })
    )
  }
}
