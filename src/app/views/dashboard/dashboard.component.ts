import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loggedUser: firebase.User;
  private tst: string;

  constructor(public authService: AuthService) {
    this.authService.user.subscribe(user => {
      this.loggedUser = user;
    });
   }

  ngOnInit() {

  }

  info(){
    console.log("Zalogowany juzer to ", this.loggedUser);
  }

  update(){
    this.loggedUser.updateProfile({
      displayName: this.tst
    })
    .then(() => {console.log("Updated")})
    .catch(err => {console.log(err)})
  }

  sendVerEmail(){
    this.loggedUser.sendEmailVerification().then(() =>  {
      console.log("Wysłany email pod adres ", this.loggedUser.email);
    }).catch(function(error) {
      console.log(error);
    });
  }

}
