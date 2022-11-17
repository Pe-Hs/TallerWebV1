import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';
import { DataTaller } from '../../taller/interface/data.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/cliente`)
  }
  getClienteId(id: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/cliente/${id}`)
  }
  postCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/cliente`, cliente)
  }
  findClienteId(nombreCliente: string, apellidoCliente: string, telefono: string, dni: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/cliente/${nombreCliente}/${apellidoCliente}/${telefono}/${dni}`)
  }
  getNroClientes() :Observable<DataTaller[]>{
    return this.http.get<DataTaller[]>(`${this.baseUrl}/nroClientes`);
  }
}
