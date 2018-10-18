import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from '../services/register.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userInfo = { username: null,  password: null, email: null};
  isActive = false;
  registerForm: FormGroup;

  constructor(private registerService: RegisterService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group ({
      username: ['', Validators.required],
      password: this.fb.group({
        pwd: ['', [Validators.required, 
                    Validators.minLength(8)]],
        confirmPwd: ['', [Validators.required,
                          Validators.minLength(8)]]
      }),
      email: ['', [Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    })
  }

  register(){
    this.registerService.register(this.userInfo)
      .subscribe((data: any) => {
        alert('register successfully');
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err.error.message);
      });
  }

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get pwd() { return this.password.get('pwd'); }
  get confirmPwd() { return this.password.get('confirmPwd'); }
  get email() { return this.registerForm.get('email'); }
  
}
