import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error) {
                    if (error.status === 400) {
                        this.toastr.error(error.message, error.status);
                    }
                    if (error.status === 401) {
                        this.toastr.error(error.message, error.status);
                    }

                    if (error.status === 404) {
                        this.toastr.error(error.message, error.status);
                    }

                    if (error.status === 500) {
                        this.toastr.error(error.message, error.status);
                    }
                }
                return throwError(error);
            })
        );
    }

}
