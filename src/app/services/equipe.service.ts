import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Equipe } from '../models/equipe';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  constructor(private http: HttpClient) { }
  
  getEquipeById(id: any): Observable<Equipe> {
    return this.http.get<Equipe>(`${API_CONFIG.baseUrl}/equipes/${id}`);
  }

  findAll(): Observable<Equipe[]>{
    return this.http.get<Equipe[]>(`${API_CONFIG.baseUrl}/equipes`)
  }

  create(equipe: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(`${API_CONFIG.baseUrl}/equipes`, equipe);
  }

  update(equipe: Equipe): Observable<Equipe>{
    return this.http.put<Equipe>(`${API_CONFIG.baseUrl}/equipes/${equipe.id}`, equipe);
  }

  delete(id: any): Observable<Equipe>{
    return this.http.delete<Equipe>(`${API_CONFIG.baseUrl}/equipes/${id}`);
  }
}
