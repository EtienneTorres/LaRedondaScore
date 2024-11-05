import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  private apiKey = '8f3569d54b888d1edf7683ad56d9df25'; 
  private apiUrl = 'https://v3.football.api-sports.io/fixtures';
  private apiUrl2 = 'https://v3.football.api-sports.io/countries';
  private apiurl3='https://v3.football.api-sports.io/leagues'

  constructor(private http: HttpClient) {}

  getPartidosDelDia(date: string): Observable<any> {
    const headers = {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    };
    
    return this.http.get<any>(`${this.apiUrl}?date=${date}`, { headers }).pipe(
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

    return this.http.get<any>(`${this.apiUrl}?id=${id}`, { headers }).pipe(
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
    return this.http.get<any>(`${this.apiUrl2}`, { headers }).pipe(
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
    return this.http.get<any>(`${this.apiurl3}`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener las ligas', error);
        return throwError(error);
      })
    );

  }
  

}
