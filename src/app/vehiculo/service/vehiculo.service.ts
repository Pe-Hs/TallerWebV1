import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from '../interface/vehiculo.interface';
import { VCliente } from '../interface/vcliente.interface';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getVehiculos(): Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(`${this.baseUrl}/vehiculo`)

  }
  getVehiculosbyIdCliente(idCliente : string ): Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(`${this.baseUrl}/vehiculo/cliente/${idCliente}`)
  }

  postVehiulo(vehiculo: Vehiculo): Observable<Vehiculo>{
    return this.http.post<Vehiculo>(`${this.baseUrl}/vehiculo`, vehiculo)
  }

  findVehiculoId(placa :string, marca: string, modelo:string) : Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(`${this.baseUrl}/vehiculo/${placa}/${marca}/${modelo}`)

  }
}
