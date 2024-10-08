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
  
  getEquipeById(id: number): Observable<Equipe> {
    return this.http.get<Equipe>(`${API_CONFIG.baseUrl}/equipes/${id}`);
}
}
