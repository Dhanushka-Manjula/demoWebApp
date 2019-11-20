import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user';
import {NgForm} from '@angular/forms';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user: User;
  isLoginError = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      Id: null
    };
  }

  OnSubmit(userName: any, password: any) {

    this.userService.userAuthentication(userName, password).subscribe((data: any) => {
        localStorage.setItem('userToken', data.access_token);
        this.router.navigate(['/home']);
      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }
}
