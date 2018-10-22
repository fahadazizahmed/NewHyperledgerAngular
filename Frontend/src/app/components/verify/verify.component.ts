import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  public token: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router :Router
  ) { }

  ngOnInit() {
    
    // this.token = this.route.snapshot.params;
    // console.log(this.token);

    this.route.params.subscribe(
      params => {
        this.token = params.token;
         console.log('Parameters are ' , this.token );
  });

    
    
    this.authService.verifyUser(this.token).subscribe(res => {
      console.log('Response issssssszzz ' , res);
       alertify.logPosition('top right').success(res['message']);//example
        this.router.navigate(['/login']);     
    },
     err => {
      alertify.logPosition('top right').error("Invalid token");//example
      this.router.navigate(['/login']);
       return false;
      });
  }

}
