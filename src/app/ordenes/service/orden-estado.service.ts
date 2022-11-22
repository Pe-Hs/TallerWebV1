import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdenEstado } from '../interfaces/ordenEstado.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdenEstadoService {

  private baseUrl :string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getOrdenEstadoByIdOrden(idOrden : string): Observable<OrdenEstado[]>{
    return this.http.get<OrdenEstado[]>(`${this.baseUrl}/ordenEstado/${idOrden}`)
  }
}
