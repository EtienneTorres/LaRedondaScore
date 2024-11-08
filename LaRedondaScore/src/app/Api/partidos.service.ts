import { Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  private apiKey = 'a23811ba8958ba1b18b979c804d41aca'; 
  private apiUrl = 'https://v3.football.api-sports.io';

  constructor(private http: HttpClient) {}

  getPartidosDelDia(date: string): Observable<any> {
    const headers = {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    };
    
    return this.http.get<any>(`${this.apiUrl}/fixtures?date=${date}`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener los partidos del día', error);
        return throwError(error);
      })
    );
  }

  getPartidoPorId(id: string): Observable<any> {
    const headers = {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    };

    return this.http.get<any>(`${this.apiUrl}/fixtures?id=${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener los detalles del partido', error);
        return throwError(error);
      })
    );
  }

   // Método para obtener todos los países
   getCountries(): Observable<any> {
    const headers = {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    };
    return this.http.get<any>(`${this.apiUrl}/countries`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener los países', error);
        return throwError(error);
      })
    );
  }

  getleagues():Observable<any>
  {

    const headers = {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    };
    return this.http.get<any>(`${this.apiUrl}/leagues`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener las ligas', error);
        return throwError(error);
      })
    );

  }


  getEquiposPorNombre(teamName: string): Observable<any> {
    const headers = {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': this.apiKey
    };
    //const params = new HttpParams().set('name', teamName); // Parámtero de búsqueda

    return this.http.get<any>(`${this.apiUrl}/teams?name=${teamName}`, { headers }).pipe(
        catchError(error => {
            console.error('Error al obtener el equipo', error);
            return throwError(error);
        })
    );
}

getLeagueDetails(id: string): Observable<any> {
  const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey
  };

  return this.http.get<any>(`${this.apiUrl}/leagues?id=${id}`, { headers }).pipe(
    catchError(error => {
      console.error('Error al obtener los detalles de la liga', error);
      return throwError(error);
    })
  );
}

getSeasonStats(id: string): Observable<any> {
  const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey
  };

  return this.http.get<any>(`${this.apiUrl}/leagues?id=${id}`, { headers }).pipe(
        catchError(error => {
      console.error('Error al obtener las estadísticas de la temporada', error);
      return throwError(error);
    })
  );
}
}