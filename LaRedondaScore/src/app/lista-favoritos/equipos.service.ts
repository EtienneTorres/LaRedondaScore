import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  urlbase: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  currentUserId: number | null = null; 


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
