import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUser() : Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`)
  }
  postUser(usuario : User): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/user`, usuario)
  }
}
