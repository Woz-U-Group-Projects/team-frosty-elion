import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user';
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    this.userService.login(this.user).subscribe(() => {
      this.userService.getProfile().subscribe(() => {
        // set the user to logged in
        this.userService.loggedIn = true;
        // send to the profile page
        this.router.navigate(["profile"]);
      });
    });
  }

  ngOnInit() { }
}