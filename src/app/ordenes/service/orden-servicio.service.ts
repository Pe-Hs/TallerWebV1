import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdenServicio } from '../interfaces/ordenServicio.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdenServicioService {

  private baseUrl :string = environment.baseUrl;

  constructor(private http : HttpClient) { }

   getServiciosOrden(idOrden:string):Observable<OrdenServicio[]>{
    return this.http.get<OrdenServicio[]>(`${this.baseUrl}/ordenServicio/${idOrden}`)
   }
}
