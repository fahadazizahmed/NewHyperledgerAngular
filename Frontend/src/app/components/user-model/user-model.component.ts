import { Component, OnInit ,Input} from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as alertify from 'alertify.js';
declare var $:any;

@Component({
  selector: 'app-user-model',
  templateUrl: './user-model.component.html',
  styleUrls: ['./user-model.component.css']
})
export class UserModelComponent implements OnInit {

  
  processing:boolean = false;
  user:any = {};
  username:string;
  activate:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService
  ) {

  }

  ngOnInit() {

  }

  openModal(id:any){
    
    this.spinnerService.show();
  
    this.authService.getUserById(id).subscribe(res =>{
      
      if(res['success'] === true){
        console.log('Response from data is ' , res['message']);
        this.user = res['message'];
        this.activate = this.user.activate;
        this.spinnerService.hide();
        console.log('Open model inside user model',id);
        // this.showAngularModal($("#myModal"));
        $("#myModal").showAngularModal();
        // $("#myModal").showAngularModal();
        // $("body").addClass("modal-open");
        // $("#myModal").addClass("show in");
       // $('#myModal').modal('show');
      }
    });
  }

  activateUser(){
    console.log('Hello World', this.user._id);
    this.spinnerService.show();
    this.authService.getUserById(this.user._id).subscribe(res =>{
      console.log('Response from data is ' , res['message']);
      if(res['success'] === true){

       let newUser = {
        "userID":this.user._id,
        "name":this.user.username,
        "distanceFromGrid":this.user.distanceFromGrid,
        "pricePerKWH":this.user.PricePerKWH,
        "balanceAmount":this.user.balanceAmount,
        "productionCapacity":this.user.productionCapacity,
        "latitude":this.user.Lattitude,
        "longitude":this.user.Longitude,
        
        "location":this.user.LocationDetail
       };
       console.log('New user detail is ', newUser);
        
        this.dataService.createUser(newUser).subscribe(res =>{
          console.log(res);

          this.authService.activateUser(this.user._id).subscribe(res =>{
            console.log('Response for activate user',res);
            if(res['success'] === true){
              alertify.logPosition('top right').success("User account has been activated sucessfully");//example
              this.spinnerService.hide();
              $('#myModal').modal('hide');
            }else{

              alertify.logPosition('top right').error("Somthing went wrong please try again");//example
              this.spinnerService.hide();
            }
           
          })

         
        });

      }
    });
  }



}
