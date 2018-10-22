import { Component, OnInit ,OnDestroy,ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Observable } from "rxjs/Observable";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {UserModelComponent} from '../user-model/user-model.component';
declare var $:any;

@Component({


  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit , OnDestroy{

  @ViewChild(UserModelComponent) userModel:UserModelComponent;

  user:object;
  users$: object[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  title:any = '';
  userId:any = '';
  timerValue:boolean = false;
  registerModalShown = false;


  constructor(
              private authService:AuthService,
              private router:Router,
              private spinnerService: Ng4LoadingSpinnerService
            ) {

            }

  ngOnInit() {

    this.spinnerService.show();
    this.authService.getProfile().subscribe(profile => {

      this.user = profile['user'];
      this.spinnerService.hide();
    },
     err => {
       this.spinnerService.hide();
       return false;
     });


     this.dtOptions = {
           pagingType: 'full_numbers',
           pageLength: 5,
           processing: true
         };

         this.authService.getAllUsers().subscribe(data => {

           this.users$ = data['users'];
           this.dtTrigger.next();
         });




  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  openModal(id:any){
    this.userModel.openModal(id);
   
  }

}
