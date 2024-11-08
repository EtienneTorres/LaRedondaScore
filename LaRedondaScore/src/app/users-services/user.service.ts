import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }

  urlbase:string='http://localhost:3000'


     // Método para registrar un nuevo usuario
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.urlbase}/users`, { username, password });
  }
  
   // Método para hacer login
  login(username: string, password: string): Observable<any> {
    // Aquí buscamos al usuario por su username y password
    return this.http.get(`${this.urlbase}/users?username=${username}&password=${password}`);
  }

  


}
