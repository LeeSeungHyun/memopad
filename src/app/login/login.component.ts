import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isActive = false;
  hide = true;
  data = { username: null,  password: null };
  isLoginSuccess: boolean;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }
  
  ngOnInit() {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/memopad']);
    }
    this.loginForm = this.fb.group ({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  logIn(){
    this.authService.logIn(this.data)
      .subscribe((data: any) => {
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('username' , this.data.username);
        this.router.navigate(['/memopad']);
      },
      (err) => {
        console.log(err.error.message);
        this.isLoginSuccess = false;
      });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}
