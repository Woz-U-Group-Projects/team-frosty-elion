import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User[];
  @Input() dataPath: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<User[]>(this.dataPath).subscribe(user => {
    this.user = user;
    });
  }
}