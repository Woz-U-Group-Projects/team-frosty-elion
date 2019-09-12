import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // base url of the express back end
  url: string = "http://localhost:3000/users/";

  // POST baserl/register
  register(user:User): Observable<string> {
    return this.http.post<string>(this.url + "register", user);
  }

  // login a user
  login(user:User): Observable<string> {
    return this.http.post<string>(this.url + "login", user)
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }));
  }

  // get a user profile
  getProfile(): Observable<User> {
    return this.http.get<User>(this.url + "profile")
  }

  // logout
  logout(): Observable<any> {
    return this.http.get(this.url + "logout");
  }
}
