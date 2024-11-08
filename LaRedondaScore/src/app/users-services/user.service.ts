import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }

  urlbase:string='http://localhost:3000'

  currentUserId: number | null = null; 

     // Método para registrar un nuevo usuario
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.urlbase}/users`, { username, password });
  }
  
   // Método para hacer login
  login(username: string, password: string): Observable<any> {
    // Aquí buscamos al usuario por su username y password
    return this.http.get(`${this.urlbase}/users?username=${username}&password=${password}`);
  }

  getUserId(): number | null {
    return this.currentUserId;  // Obtén el `userId` de la sesión activa
  }

   // Obtener los equipos favoritos de un usuario
   getFavoriteTeams(userId: number): Observable<any> {
    return this.http.get(`${this.urlbase}/users/${userId}/favoriteTeams`);
  }

  // Agregar un equipo a la lista de favoritos de un usuario
  // addFavoriteTeam(userId: number, team: string): Observable<any> {
  //   return this.http.post(`${this.urlbase}/users/${userId}/favoriteTeams`, team);
  // }

  
  // Eliminar un equipo de la lista de favoritos de un usuario
  removeFavoriteTeam(userId: number, teamId: number): Observable<any> {
    return this.http.delete(`${this.urlbase}/users/${userId}/favoriteTeams/${teamId}`);
  }


  addFavoriteTeam(userId: number, teamName: string): Observable<any> {
   return  this.http.post(`http://localhost:3000/users/${userId}/favoritos`, { teamName });

  }
  
  





}
