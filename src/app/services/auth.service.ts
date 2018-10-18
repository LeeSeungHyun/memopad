import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  isLoggedIn(){
    if(localStorage.getItem('id_token')){
      return true;
    } else {
      return false;
    }
  }

  logIn(data){
    return this.http.post(environment.api + '/api/auth/login', data);
  }

  logOut(){
    localStorage.removeItem('id_token');
    localStorage.removeItem('username');
  }
}
