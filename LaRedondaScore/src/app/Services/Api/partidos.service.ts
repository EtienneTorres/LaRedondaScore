import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  private apiKey = '2c997789c1f759531f7328171d176dc3'; 
  private apiUrl = 'https://v3.football.api-sports.io';

  // Constructor
  constructor(private http: HttpClient) {}


     // Método para obtener todos los partidos del dia
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

   // Método para obtener partido por id
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

     // Método para obtener las ligas
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

   // Método para obtener equipos por nombre
  getEquiposPorNombre(teamName: string): Observable<any> {
    const headers = {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': this.apiKey
    };

    return this.http.get<any>(`${this.apiUrl}/teams?name=${teamName}`, { headers }).pipe(
        catchError(error => {
            console.error('Error al obtener el equipo', error);
            return throwError(error);
        })
    );
}

   // Método para obtener equipo por id
getEquiposPorID(id: string): Observable<any> {
  const headers = {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
  };
 
  return this.http.get<any>(`${this.apiUrl}/teams?id=${id}`, { headers }).pipe(
      catchError(error => {
          console.error('Error al obtener el equipo', error);
          return throwError(error);
      })
  );
}

   // Método para obtener los detalles de una liga determinada
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

   // Método para obtener las estadisticas de una liga determinada
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

   // Método para obtener todos los partidas de una liga por temporada
getPartidosPorLiga(leagueId: number, season: string): Observable<any> {
  const headers = new HttpHeaders({
    'x-rapidapi-key': this.apiKey, 
  });

  return this.http.get<any>(`${this.apiUrl}/fixtures?league=${leagueId}&season=${season}`, { headers });
}

   // Método para obtener las temporadas disponibles
getAvailableSeasons(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/leagues/seasons`);
}


   // Método para obtener la tabla de posicion de una liga por temporada
getStandings(leagueId: number, season: string): Observable<any> {
  const headers = new HttpHeaders({
    'x-rapidapi-key': this.apiKey, 
  });

  return this.http.get<any>(`${this.apiUrl}/standings?league=${leagueId}&season=${season}`, { headers });
}

   // Método para obtener jugadores por nombre
getJugadoresPorNombre(name: string): Observable<any> {
  const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey
  };

  return this.http.get<any>(`${this.apiUrl}/players/profiles?search=${name}`, { headers }).pipe(
    tap(data => console.log('Datos obtenidos:', data)),
    catchError(error => {
      console.error('Error al obtener el jugador', error);
      return throwError(error);
    })
  );
}

   // Método para obtener jugadores por id
getJugadoresPorID(id: string): Observable<any> {
  const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey
  };

  return this.http.get<any>(`${this.apiUrl}/players/profiles?player=${id}`, { headers }).pipe(
    tap(data => console.log('Datos obtenidos:', data)),
    catchError(error => {
      console.error('Error al obtener el jugador', error);
      return throwError(error);
    })
  );
}
}


