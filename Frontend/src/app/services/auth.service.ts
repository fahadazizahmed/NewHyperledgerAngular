import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http:HttpClient) { }


  registerUser(user){
    console.log('User inside register service',user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {
      headers:new HttpHeaders().append('Content-Type','application/json')
  }).pipe(map(res =>res));
  }


  authenticateUser(user){

    return this.http.post('http://localhost:3000/users/authenticate',  user, {
      headers:new HttpHeaders().append('Content-Type','application/json')
    }).pipe(map(res =>res));
  }

  // Forget Password Api Call

  forgetPassword(email){
    return this.http.post('http://localhost:3000/users/forgetPassword',{email: email}, {
      headers:new HttpHeaders().append('Content-Type','application/json')
    }).pipe(map(res =>res));
  }

  // Reset Password

  resetPassword(token, password){
    return this.http.post("http://localhost:3000/users/resetPassword/"+token+"/"+password, {
      headers:new HttpHeaders().append('Content-Type','application/json')
    }).pipe(map(res =>res));
  }


  getProfile() {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });

    return this.http.get('http://localhost:3000/users/profile', {headers:headers }).pipe(map(res=>res));
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    console.log('Token is  ' + this.authToken);
  }



  loggedIn(){
    
    if (localStorage.getItem('id_token') == undefined ){

     return false;
    } else {
  const helper = new JwtHelperService();
    return !helper.isTokenExpired(localStorage.getItem('id_token')); // other people are putting 'id_token'' here but it didn't work for me so i just put the localStorage item
    }
   }


   AdminloggedIn(){

    var isAdmin = JSON.parse(localStorage.getItem("user")).isAdmin;
    if(isAdmin)
      return true;
    else{
    
      return false;
    }


   }


  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }



  // Function to check if username is taken
 checkUsername(username) {
 const headers = new HttpHeaders({
   'Content-Type':  'application/json'
 });
   return this.http.get('http://localhost:3000/users/checkUsername/' + username,{headers:headers })
   .pipe(map(res=>res));
 }


 checkEmail(email) {
   const headers = new HttpHeaders({
     'Content-Type':  'application/json'
   });

   return this.http.get('http://localhost:3000/users/checkEmail/' + email, {headers:headers }).pipe(map(res=>res));
 }


 getUserById(_id) {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });

  return this.http.get('http://localhost:3000/users/getUserById/' + _id, {headers:headers }).pipe(map(res=>res));
}

activateUser(_id) {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.get('http://localhost:3000/users/activateUser/' + _id, {headers:headers }).pipe(map(res=>res));
}

 // Function to get all users records
getAllUsers() {
const headers = new HttpHeaders({
  'Content-Type':  'application/json'
});
  return this.http.get('http://localhost:3000/users/getAllUsers',{headers:headers })
  .pipe(map(res=>res));
}

verifyUser(token){
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
    return this.http.get('http://localhost:3000/users/verify/'+ token ,{headers:headers })
    .pipe(map(res=>res));
}


}
