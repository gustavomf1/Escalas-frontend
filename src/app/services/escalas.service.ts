import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escala } from '../models/escala';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class EscalasService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Escala[]> {
    return this.http.get<Escala[]>(`${API_CONFIG.baseUrl}/escalas`);
  }
}
