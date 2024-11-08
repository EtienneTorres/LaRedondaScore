import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  urlbase: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}


}
