import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable()
export class RegisterService {
  constructor(private http: HttpClient) { }

  register(userInfo) {
    console.log(userInfo);
    return this.http.post('/api/auth/register', userInfo);
  }
}
