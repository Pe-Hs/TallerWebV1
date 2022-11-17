import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Motivo } from '../interface/motivo.interface';

@Injectable({
  providedIn: 'root'
})
export class MotivoService {

  private baseUrl = environment.baseUrl;

  constructor(private http : HttpClient) { }

  getMotivos():Observable<Motivo[]>{
    return this.http.get<Motivo[]>(`${this.baseUrl}/motivo`);
  }
  getMotivosbyId(idMotivo: string):Observable<Motivo[]>{
    return this.http.get<Motivo[]>(`${this.baseUrl}/motivo/${idMotivo}`);
  }
  postMotivo(motivo : Motivo):Observable<Motivo>{
    return this.http.post<Motivo>(`${this.baseUrl}/motivo`, motivo);
  }
  getMotivobyVehiculoId(idVehiculo: string):Observable<Motivo[]>{
    return this.http.get<Motivo[]>(`${this.baseUrl}/motivoVehiculo/${idVehiculo}`)
  }
}
