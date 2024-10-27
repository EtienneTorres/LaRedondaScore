import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  private apiKey = 'da6fd527b81bacac0e1a59e9629e4284'; 
  private apiUrl = 'https://v3.football.api-sports.io/fixtures';

  constructor(private http: HttpClient) {}

  getPartidosDelDia(date: string): Observable<any> {
    const headers = {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    };
    return this.http.get<any>(`${this.apiUrl}?date=${date}`, { headers });
  }
}