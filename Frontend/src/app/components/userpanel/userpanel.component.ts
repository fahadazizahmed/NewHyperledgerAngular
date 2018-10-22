import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent implements OnInit {

  

 Rangoo:String = 'https://hyperledger-power-watson-rest-appreciative-bear.eu-gb.mybluemix.net/';



  constructor() {
    console.log(this.Rangoo+'api/User');
   }

  ngOnInit() {
  }

}
