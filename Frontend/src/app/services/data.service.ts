import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 RengooUrl:any = 'https://hyperledger-power-watson-rest-turbulent-lynx.eu-gb.mybluemix.net/api/User';
 MixUrl:any = 'https://hyperledger-power-watson-rest-turbulent-lynx.eu-gb.mybluemix.net/api/User';
 ConsumptionUrl ='https://hyperledger-power-watson-rest-turbulent-lynx.eu-gb.mybluemix.net/api/queries/GetConsumptionForTable?user=resource%3Awaltson.poc.hyperledger.User%23';

 PowerStorageUrl:any = 'https://hyperledger-power-watson-rest-turbulent-lynx.eu-gb.mybluemix.net/api/User';
 
PowerStorageUrlById:any='https://hyperledger-power-watson-rest-turbulent-lynx.eu-gb.mybluemix.net/api/User/';
BuyEnergyUrl:any = 'https://hyperledger-power-watson-rest-turbulent-lynx.eu-gb.mybluemix.net/api/buyEnergy';
BuyersOpenToOfferUrl:any = 'https://hyperledger-power-watson-rest-turbulent-lynx.eu-gb.mybluemix.net/api/queries/GetAllOpenOfferedUsers';



  constructor(private http: HttpClient) { 
   
  }

  getUsers(){

  }

  createUser(newUser){

     console.log('I am in new User',newUser.userID);
    return this.http.post(this.RengooUrl,newUser, {
      headers:new HttpHeaders().append('Content-Type','application/json')
    }).pipe(map(res =>res));
  }

  

  getConsumption(userId:any){
      
       console.log('Consupmtion Url is zzzzzzzzzzzzzzzzz',this.ConsumptionUrl+userId);     
      return this.http.get(this.ConsumptionUrl+userId, {
      headers:new HttpHeaders().append('Content-Type','application/json')
    }).pipe(map(res =>res));
  }


  getMix(userId:any){
       

       console.log('User id detail is ', userId);
      // console.log('USER ID IS ', this.MixUrl+'/'+userid)
    return $.get(this.MixUrl+'/'+userId);
    // return this.http.get(this.MixUrl+"5bc982a30aa86f0eb4b282b4").pipe(map(res =>res));
  }

  getBuyersOpenToOffer(){
    return this.http.get(this.BuyersOpenToOfferUrl, {
      headers:new HttpHeaders().append('Content-Type','application/json')
    }).pipe(map(res =>res));
  }


  getPowerStorateData(){
    return this.http.get(this.PowerStorageUrl, {
      headers:new HttpHeaders().append('Content-Type','application/json')
    }).pipe(map(res =>res));
  }

  getPowerStorageDataByUserId(id:any){
    return this.http.get(this.PowerStorageUrlById + id, {
      headers:new HttpHeaders().append('Content-Type','application/json')
    }).pipe(map(res =>res));
  }

  buyEnergy(info){
      return this.http.post(this.BuyEnergyUrl,info, {
      headers:new HttpHeaders().append('Content-Type','application/json')
    }).pipe(map(res =>res));
  }

}
