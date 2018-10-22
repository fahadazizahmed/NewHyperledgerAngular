import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import * as alertify from 'alertify.js';
declare var $:any

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  processing;
  form;
  token:any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router :Router
  ) {
    this.createForm();
  }

  ngOnInit() {

    this.route.params.subscribe(
      params => {
        this.token = params.token;
  });



  }


   // Function to create registration form
   createForm() {
    this.form = this.formBuilder.group({
      // Password Input
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
      Validators.maxLength(50), // Maximum length is 35 characters
      ])],
      // Confirm Password Input
      confirm: ['', Validators.required] // Field is required
    }, { validator: this.matchingPasswords('password', 'confirm') }); // Add custom validator to form for matching passwords
  }


   // Funciton to ensure passwords match
   matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value != '' && group.controls[confirm].value != '')
      if (group.controls[password].value === group.controls[confirm].value) {
       this.processing = !false;
        return null; // Return as a match

      } else {

        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
  }

  onResetSubmit(){

    this.authService.resetPassword(this.token, this.form.value.password ).subscribe(res => {


      if(res['success'] === true){

        alertify.logPosition('top right').success("Password has been updated sucessfully");//example
        this.router.navigate(['/login']);
      }else{
        alertify.logPosition('top right').error("Invalid Token or expired please try again ");//example
        this.router.navigate(['/forget']);
      }

    });


  }


}
