import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router,  private toastr: ToastrService) { }

  ngOnInit() {
  }

  emailLogin() {
    if (this.credentials.email !== '' && this.credentials.password !== '') {
      this.authService.emailLogin(this.credentials.email, this.credentials.password).then(res => {
        const userID = res.user.uid;
        localStorage.setItem('user', JSON.stringify(userID));
        this.router.navigate(['/home']);
      },
        err => {
        this.handleError(err.code);
          this.credentials = {
            email: '',
            password: ''
          };
        });
    } else {
      this.handleError('');
    }
  }

  handleError(errorCode: string) {
    if (this.credentials.email === '' || this.credentials.password === '') {
      this.toastr.error('Must provide both email and password', 'Error', { positionClass: 'toast-top-full-width'});
      return;
    }
    switch (errorCode) {
      case 'auth/invalid-email': {
        this.toastr.error('Invalid email format', 'Error', { positionClass: 'toast-top-full-width'});
        break;
      }
      case 'auth/user-not-found': {
        this.toastr.error('User does not exist', 'Error', { positionClass: 'toast-top-full-width'});
        break;
      }
      case 'auth/wrong-password': {
        this.toastr.error('Incorrect email or password', 'Error', { positionClass: 'toast-top-full-width'});
        break;
      }
      case 'auth/network-request-failed': {
        this.toastr.error('No network connection', 'Error', { positionClass: 'toast-top-full-width'});
        break;
      }
      default: {
        break;
      }
    }
  }

}
