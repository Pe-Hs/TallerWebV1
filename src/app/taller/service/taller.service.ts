import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Taller } from '../interface/taller.interface';

@Injectable({
  providedIn: 'root'
})
export class TallerService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTaller() : Observable<Taller[]>{
    return this.http.get<Taller[]>(`${this.baseUrl}/taller`)
  }

  getTallerbyId(idTaller: string) : Observable<Taller[]>{
    return this.http.get<Taller[]>(`${this.baseUrl}/taller/${idTaller}`)
  }
}
