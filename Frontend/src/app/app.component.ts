import { Component , HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    //  this.endSession();
  }

 endSession(){
   //this.authToken = null;
  // this.user = null;
   localStorage.clear();
 }
  title = 'Frontend';
}
