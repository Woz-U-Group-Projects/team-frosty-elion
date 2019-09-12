import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // options allows us to flag that we are using credentials(cookies)
  options = { withCredentials: true };

  // boolean value to hold the login status
  loggedIn: boolean = false;

  // base url of the express back end
  url: string = "http://localhost:3000/user";

  // POST baserl/register
  register(user: User) : Observable<string> {
    return this.http.post<string>(this.url + "/register", user, this.options);
  }

  // login a user
  login() : Observable<User> {
    return this.http.get<User>(this.url + "/login", this.options);
  }

  // get a user profile
  getProfile() : Observable<User> {
    return this.http.get<User>(this.url + "/profile", this.options);
  }

  // logout
  logout() : Observable<string> {
    return this.http.get<string>(this.url + "logout", this.options);
  }

  // validate token
  validateToken() : Observable<boolean> {
    return this.http.get<boolean>(this.url + "validateToken", this.options);
  }
}
