import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  urlbase:string='http://localhost:3000'

  // Constructor
  constructor(private http:HttpClient, private router:Router) { }


    // Método para registrar un nuevo usuario
    register(username: string, password: string): Observable<any> {
      // Primero, buscamos si el usuario ya está registrado
      return this.http.get<any[]>(`${this.urlbase}/users?username=${username}`).pipe(
        map(users => {
          // Si hay usuarios con ese nombre de usuario, lanzamos un error
          if (users && users.length > 0) {
            throw new Error('El usuario ya existe');
          }
          // Si no existe, procedemos con el registro
          return this.http.post(`${this.urlbase}/users`, { username, password });
        }),
        catchError((error) => {
          // Si hubo un error, lo devolvemos para manejarlo en el componente
          throw error;
        })
      );
    }
  
   // Método para hacer login
  login(username: string, password: string): Observable<any> {
    // Aquí buscamos al usuario por su username y password
    return this.http.get(`${this.urlbase}/users?username=${username}&password=${password}`);
  }

  // Método para hacer logout
  logout(): void {
    localStorage.removeItem('userId');  // Elimina el ID del usuario de localStorage
    this.router.navigate(['/login-page']);  // Redirige al usuario al login
  }


}
