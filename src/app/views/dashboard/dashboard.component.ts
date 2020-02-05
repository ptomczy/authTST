import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';
import { DatabaseService } from 'src/app/services/database.service';
import { IData } from 'src/app/models/total.model';
import { Subscriber, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loggedUser: firebase.User;
  private usrDataFromDB: Array<IData>;
  private tst: string;

  constructor(public authService: AuthService, public databaseService: DatabaseService) {
    this.authService.user.subscribe(user => {
      this.loggedUser = user;
    });
   }

  ngOnInit() {
    this.databaseService.getData().subscribe(data => {
      this.usrDataFromDB = data.filter(x => x.uid == this.loggedUser.uid);
      console.log("Wynik: ", this.usrDataFromDB);
    });
    
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

  sendNewData(){
    this.databaseService.addData({
      uid: this.loggedUser.uid,
      val1: (Math.random() * 10).toString(),
      val2: 'Wartość 2'
    })
  }

  updateData(itm: IData){
    itm.val2 = 'chujoaw ZMIANA';
    //this.databaseService.editData(this.loggedUser.uid, itm);
    this.databaseService.editData2(itm);
  }

}
