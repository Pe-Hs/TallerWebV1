import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventario } from '../interfaces/inventario.interface';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Inventario[]>{
    return this.http.get<Inventario[]>(`${this.baseUrl}/productosTaller`);
  }

}
