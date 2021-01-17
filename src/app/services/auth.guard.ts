import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router){}

  canLoad(): Observable<boolean>{
    return this.authService.isAuth()
          .pipe(
            tap(estado => {
              if (!estado) { this.router.navigate(['/login']); }
            } ),
            //el take sirve para cuando ya se realice la primera vez se cancela la suscripcion y se tiene que hacer asi porque cada vez que quiero entarr al modulo se tiene que verificar la suscripcion
            take(1)
          );
  }
  canActivate(): Observable<boolean>{
    return this.authService.isAuth()
         .pipe(
           tap(estado => {
             if (!estado) { this.router.navigate(['/login']); }
           } )
         );
  }
}
