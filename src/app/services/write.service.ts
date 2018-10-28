import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Writing } from '../models/writing';
import { Favorite } from '../models/favorite';
import { environment } from '../../environments/environment';
//import { envoronment }

@Injectable()
export class WriteService {
  constructor(private http: HttpClient) { }

  favoriteList(){
    return this.http.get('/api/writing/favoriteList')
      .map(response => <Favorite[]>response);
  }

  writingList(){
    return this.http.get('/api/writing/list')
      .map(response => <Writing[]>response);
  }

  writeWriting(contentInfo){
    return this.http.post('/api/writing/create', contentInfo);
  }

  editWriting(contentInfo){
    return this.http.post('/api/writing/edit', contentInfo);
  }

  deleteWriting(writingId){
    const data: any = {_id: writingId};
    return this.http.post('/api/writing/delete', data);
  }

  isFavorite(_id, username){
    const data: any = {_id: _id, username: username};
    return this.http.post('/api/writing/favorite', data);
  }
}
