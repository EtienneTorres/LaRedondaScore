import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { of } from 'rxjs';
import { Favoritos } from '../Favorite-teams/favoritos';


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

  
  addFavoriteTeam(userId: number, teamName: string): Observable<any> {
    return this.http.get<any[]>(`${this.urlbase}/favoritos/?userId=${userId}`).pipe(
      switchMap(favoritos => {
        if (favoritos.length > 0) {
          const favorito = favoritos[0];
          
          // Verificar si el equipo ya existe
          if (!Object.values(favorito.equipos).includes(teamName)) {
            const newId = Object.keys(favorito.equipos).length + 1; // Generar nuevo ID para el equipo
            favorito.equipos[newId] = teamName; // Agregar el nuevo equipo
  
            // Actualizar los favoritos del usuario
            return this.http.put(`${this.urlbase}/favoritos/${favorito.id}`, favorito);
            
          } else {
            return of({ message: 'El equipo ya está en tus favoritos' });
          }
        } else {
          return of({ message: 'Usuario no encontrado' });
        }
      })
    );
  }
  
  
  
  
  
  getFavoriteTeams(userId: number): Observable<any> {
    return this.http.get<any[]>(`${this.urlbase}/favoritos/?userId=${userId}`).pipe(
      map(favoritos => {
        if (favoritos.length > 0) {
          return favoritos[0].equipos; // Devuelve solo el objeto "equipos"
        }
        return {}; // Si no existe el usuario, devuelve un objeto vacío
      })
    );
  }
  
  
  





}
