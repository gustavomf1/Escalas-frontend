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

  findById(id: any): Observable<Escala> {
    return this.http.get<Escala>(`${API_CONFIG.baseUrl}/escalas/${id}`);
  }

  findAll(): Observable<Escala[]> {
    return this.http.get<Escala[]>(`${API_CONFIG.baseUrl}/escalas`);
  }

  create(escala: Escala): Observable<Escala>{
    return this.http.post<Escala>(`${API_CONFIG.baseUrl}/escalas`, escala);
  }

  update(escala: Escala): Observable<Escala> {
    return this.http.put<Escala>(`${API_CONFIG.baseUrl}/escalas/${escala.id}`, escala);
  }

  delete(id: any): Observable<Escala>{
    return this.http.delete<Escala>(`${API_CONFIG.baseUrl}/escalas/${id}`);
  }
}
