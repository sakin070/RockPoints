import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  newUser: User = new User();
  password: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.authService.registerUser(this.newUser.email, this.password).then(res => {
      this.newUser.id = res.user.uid;
      this.newUser.firstName = '';
      this.newUser.lastName = '';
      this.newUser.email = '';
      localStorage.setItem('user', JSON.stringify(this.newUser));
      this.router.navigate(['/homepage']);
    });
  }

}

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
  }
}
