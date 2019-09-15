import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { JwtResponse } from '../model/jwt-response';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // base url of the express back end
  private url: string = "http://localhost:3000/users/";

  // POST baserl/register
  register(user:User): Observable<string> {
    return this.http.post<string>(this.url + "register", user, httpOptions);
  }

  // login a user
  login(user:User): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.url + "login", user, httpOptions);
  }

  // get a user profile
  getProfile(): Observable<any> {
    return this.http.get<any>(this.url + "profile");
  }
}
