import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orden } from '../interfaces/orden.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getOrdenes(): Observable<Orden[]>{
    return this.http.get<Orden[]>(`${this.baseUrl}/ordenesTrabajo`);
  }
  postOrden(orden: Orden):Observable<Orden>{
    return this.http.post<Orden>(`${this.baseUrl}/ordenesTrabajo`,orden)
  }
}
