import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Pessoa>{
    return this.http.get<Pessoa>(`${API_CONFIG.baseUrl}/pessoas/${id}`);
  }

  findAll(): Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(`${API_CONFIG.baseUrl}/pessoas`)
  }

  create(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${API_CONFIG.baseUrl}/pessoas`, pessoa);
  }

  update(pessoa: Pessoa): Observable<Pessoa>{
    return this.http.put<Pessoa>(`${API_CONFIG.baseUrl}/pessoas/${pessoa.id}`, pessoa);
  }
}
