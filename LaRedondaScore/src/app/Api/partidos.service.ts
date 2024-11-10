import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  private apiKey = 'b10176b6dd082bf870ad6b9376be9f6a'; 
  private apiUrl = 'https://v3.football.api-sports.io';
  private apiUrlstanding = 'https://v3.football.api-sports.io/standings';

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

getEquiposPorID(id: string): Observable<any> {
  const headers = {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
  };
  //const params = new HttpParams().set('name', teamName); // Parámtero de búsqueda

  return this.http.get<any>(`${this.apiUrl}/teams?id=${id}`, { headers }).pipe(
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


getPartidosPorLiga(leagueId: number, season: string): Observable<any> {
  const headers = new HttpHeaders({
    'x-rapidapi-key': this.apiKey, // Cambia esto por tu clave API
  });

  return this.http.get<any>(`${this.apiUrl}/fixtures?league=${leagueId}&season=${season}`, { headers });
}

getAvailableSeasons(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/leagues/seasons`);
}



getStandings(leagueId: number, season: string): Observable<any> {
  const headers = new HttpHeaders({
    'x-rapidapi-key': this.apiKey, // Asegúrate de reemplazar esto por tu clave API
  });

  return this.http.get<any>(`${this.apiUrl}/standings?league=${leagueId}&season=${season}`, { headers });
}



// Nuevo metodo para buscar jugadores por nombre :)


getJugadoresPorNombre(name: string): Observable<any> {
  // Eliminar caracteres no alfanuméricos y convertir la primera letra en mayúscula
  // const cleanedName = playerName
  //   .replace(/[^\w\s]/gi, '') // Elimina caracteres especiales
  //   .replace(/\s+/g, ' ') // Reemplaza múltiples espacios por uno solo
  //   .trim(); // Elimina los espacios al principio y al final

  // // Capitalizar las primeras letras del nombre y apellido
  // const formattedName = cleanedName
  //   .split(' ')
  //   .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //   .join(' ');

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


