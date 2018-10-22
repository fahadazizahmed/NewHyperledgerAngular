import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }

this.spinnerService.show();
    this.authService.authenticateUser(user).subscribe(data => {

      if(data['success'] === 'notActivate'){
        alertify.logPosition('top right').error('Admin did not approved your account yet');
        this.spinnerService.hide();
        this.password = '';
        this.router.navigate(['login']);
      }

      if(data['success'] === true){
        alertify.logPosition('top right').success('Sucessfully login');
        this.authService.storeUserData(data['token'], data['user']);
        this.spinnerService.hide();
        console.log('User resposne is ', data);
        if(data['user']['isAdmin'] === true){
          this.router.navigate(['profile']);
        }else{
          this.router.navigate(['userPanel']);
        }
        
      } else if(data['success'] === false) {
        alertify.logPosition('top right').error('Invalid username or password');
        this.spinnerService.hide();
        this.password = '';
        this.router.navigate(['login']);
      }
    });
  }

}
