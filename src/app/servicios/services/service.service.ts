import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Servicio } from '../interfaces/servicio.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getServicios() : Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.baseUrl}/servicios`);
  }

  getServicioId(id:string) : Observable<Servicio>{
    return this.http.get<Servicio>(`${this.baseUrl}/servicios/${id}`);
  }

  postServicio(servicio: Servicio): Observable<Servicio>{
    return this.http.post<Servicio>(`${this.baseUrl}/servicios`, servicio)
  }
}
