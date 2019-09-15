import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // find the profile for the current user based on their token
    this.userService.getProfile().subscribe(user => this.user = user);
  }

}
