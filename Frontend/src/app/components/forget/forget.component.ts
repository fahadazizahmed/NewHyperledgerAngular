import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import * as alertify from 'alertify.js';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $:any

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  form;
  processing:boolean = false;
  emailVerificationResposne:any;
  emailValid;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private flashMessage:FlashMessagesService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.createForm();
   }

  ngOnInit() {

  }




   // Function to validate e-mail is proper format
   validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }

  submitForget(){

   const email = this.form.get('email').value;
     this.spinnerService.show();
   this.authService.forgetPassword(email).subscribe(res=>{
     
     if(res['success'] === true){
        this.spinnerService.hide();
      alertify.logPosition('top right').success('An email has been send to your account ');//example
     // this.form.get('email').setValue('');

     this.emailVerificationResposne = res['message'];
     this.router.navigate(['/login']);

     }else{
         this.spinnerService.hide();
      alertify.logPosition('top right').error('Something went wrong please try again ');//example
      this.form.get('email').setValue('');

     }
   });
  }


  // Function to check if e-mail is taken
  checkEmail() {

        let email = this.form.get('email').value;
        
        if(email == null || email == '' || email == undefined)
        {
          this.flashMessage.show('Please enter an email address', {
            cssClass:'alert-danger text-center',
            timeout: 3000
          });
          alertify.logPosition('top right').error("Please enter an email address ");//example
          return false;
        }
          this.spinnerService.show();
    // Function from authentication file to check if e-mail is taken
    this.authService.checkEmail(this.form.get('email').value).subscribe(data => {
      // Check if success true or false was returned from API
       console.log(data['success']);

      if (data['success'] === false) {
        this.processing = true;
        alertify.logPosition('top right').success("Email is verified");//example
          this.emailValid = true;
        this.spinnerService.hide();
      } else {
        this.emailValid = false;
        alertify.logPosition('top right').error("Email does not exits ");//example
        this.form.get('email').setValue('');
        this.spinnerService.hide();
      }
    });
  
  }


    // Function to create registration form
    createForm() {
      this.form = this.formBuilder.group({
        // Email Input
        email: ['', Validators.compose([
          Validators.required, // Field is required
          this.validateEmail // Custom validation
        ])],

        }); // Add custom validator to form for matching passwords
    }




}
