import { Component, OnInit, HostListener, Inject, trigger, state, style, transition, animate, group } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { WriteService } from '../services/write.service';
import { Writing } from '../models/writing';
import { Favorite } from '../models/favorite';
import { COUNTLIST } from '../shared/common';

declare var $:any;

@Component({
  selector: 'app-memopad',
  templateUrl: './memopad.component.html',
  styleUrls: ['./memopad.component.css'],
  animations: [
    trigger('memopad', [
      transition(':enter', [
        style({ 
          opacity: 0 
        }),
        animate('1.5s ease')
      ]),
      transition(':leave', [
        group([
          animate('1.5s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})

export class MemopadComponent implements OnInit {
  contentInfo = { username: '', content: ''};
  writings: Writing[] = [];
  favoriteLists: Favorite[] = [];
  displayWritings: Writing[] = [];
  page: number = 0;
  perPage: number = 0;
  divide: number = 0;
  mod: number = 0;
  username: string;
  isActive: boolean;
  _id: string = null;
  action: string;

  constructor(private authService: AuthService, private writeService: WriteService, 
              private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
    this.isActive = false;
    this.contentInfo.username = localStorage.getItem('username');
    this.writeService.writingList()
      .subscribe((data: Writing[]) => {
        this.writings = data['writings'];

        console.log(this.writings);
       
        //글 목록 내림차순 정렬
        this.sortWritings(this.writings);
        this.divide = Math.floor(this.writings.length / COUNTLIST);
        this.mod = this.writings.length % COUNTLIST;

        if(this.writings.length > 0){
          // // for(let i = this.page * COUNTLIST; i < (this.page + 1) * COUNTLIST; i++){
          // //   this.displayWritings.push(this.writings[i]);
          // // }
          // for(let i = 0; i < COUNTLIST; i++){
          //   this.displayWritings.push(this.writings[i]);
          // }
          if(this.writings.length < COUNTLIST){
            for(let i = 0; i < this.writings.length; i++){
              this.displayWritings.push(this.writings[i]);
            }
          } else {
            for(let i = 0; i < COUNTLIST; i++){
              this.displayWritings.push(this.writings[i]);
            }
          }
        }

        this.writeService.favoriteList()
        .subscribe((data: Favorite[]) => {
          this.favoriteLists = data['favorites'];
          let length = this.favoriteLists.length;
          this.displayWritings.map((writing) => {
            for(let i = 0; i < length; i++){
              if(writing['_id'] == this.favoriteLists[i].writingid && 
                  this.favoriteLists[i].username == this.contentInfo.username){
                    writing.isFavorite = true;
                }
            }
          });
        });
      },
      (err) => {
        console.log(err.error.message);
      });
  }

  write(){
    this.writeService.writeWriting(this.contentInfo)
      .subscribe((data: Writing) => {
        this.action = 'create';
        this.writings.unshift(data['data']);
        this.divide = Math.floor(this.writings.length / COUNTLIST);
        this.mod = this.writings.length % COUNTLIST;
        this.displayWritings.unshift(data['data']);
        
        this.contentInfo.content = '';
      },
      (err) => {
        console.log(err.error.message);
      });
  }

  edit(writing){
    this.writeService.editWriting(writing)
      .subscribe((data: Writing) => {
        console.log('edit successfully');
        this._id = null;
      },
      (err) => {
        console.log(err.error.message);
      });
  }

  editWriting(writing){
    this._id = writing._id;
  }

  deleteWriting(writing){
    let index = this.displayWritings.indexOf(writing);
    this.writeService.deleteWriting(writing._id)
    .subscribe((data: any) => {
      this.action = 'delete';
      this.displayWritings.splice(index, 1);
      //console.log('delete successfully');
    },
    (err) => {
      //console.log(err.error.message);
    });
  }

  isFavorite(writing){
    writing.isFavorite = writing.isFavorite ? false : true;
    this.writeService.isFavorite(writing._id, this.contentInfo.username)
    .subscribe((data) => {
      if(data['data'] == null){
        writing.favoriteCount++;
      } else {
        writing.favoriteCount--;
      }
    },
    (err) => {
      //console.log(err.error.message);
    });
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  sortWritings(writings: Writing[]){
    writings.sort((a, b) => {
      return a.createdTime > b.createdTime ? -1 : a.createdTime < b.createdTime ? 1 : 0;
    });
  }

  @HostListener('window:scroll') scrolling(){
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.page++;
        if(this.writings.length > this.page * COUNTLIST){
          if(this.divide == this.page){
            for(let i = this.page * COUNTLIST; i < (this.page + 1) * COUNTLIST - (COUNTLIST - this.mod); i++){
              this.displayWritings.push(this.writings[i]);
            }
          } else {
            for(let i = this.page * COUNTLIST; i < (this.page + 1) * COUNTLIST; i++){
              this.displayWritings.push(this.writings[i]);
          }
        }
      }
    }
  }
}
