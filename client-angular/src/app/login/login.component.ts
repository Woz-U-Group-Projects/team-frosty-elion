import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) {}

  login() {
    this.userService.login(this.user).subscribe(data => {
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUsername(data.username);

        // send to the profile page
        this.router.navigate(["/profile"]);
      });
  }

  ngOnInit() {  }
}