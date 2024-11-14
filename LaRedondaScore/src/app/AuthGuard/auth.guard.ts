import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {


    // Verifica si el usuario tiene un ID guardado en el localStorage
    if (localStorage.getItem('userId')) {

      return true;
    } else {
      // Redirige a la página de login si no está autenticado
      this.router.navigate(['/login-page']);
      return false;
    }
  }
}
