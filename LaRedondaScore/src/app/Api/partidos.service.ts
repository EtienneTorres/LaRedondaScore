import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  private apiKey = '6840d2a6950c4f773adfa9afcc623cbf'; // Asegúrate de no exponer esta clave en el cliente
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