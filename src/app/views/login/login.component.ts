import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = null;
  private email: string;
  private password: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  createNewUser(){
    this.authService.createNewUserWithEmail(this.email, this.password);
  }

  signInWithEmail(){
    this.authService.signInWithEmail(this.email, this.password)
    .then((res) => {
      console.log("UserDetails to: ", this.authService.loggedInUserDetails);
      this.router.navigate(['dashboard'])
    })
    .catch((err) => console.log(err));
  }

   signInWithTwitter() {
      this.authService.signInWithTwitter()
      .then((res) => { 
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }


    signInWithFacebook() {
      this.authService.signInWithFacebook()
      .then((res) => {
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }


    signInWithGoogle() {
      this.authService.signInWithGoogle()
      .then((res) => {
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }



  ngOnInit() {
  }

}
