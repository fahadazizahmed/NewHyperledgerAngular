import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral,AgmCoreModule, MapsAPILoader} from '@agm/core';

import {MapService} from '../../services/map.service'
import {DataService} from '../../services/data.service'

 import { Observable } from 'rxjs';

//import { google } from '@agm/core/services/google-maps-types';

 import { map } from 'rxjs/operators';

 //import {MdDialog, MdDialogRef} from '@angular/material';
 declare const google: any;

@Component({
  selector : 'app-map',
  templateUrl : './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit, AfterViewInit{
  @ViewChild('AgmMap') agmMap: AgmMap;
  welcomeTxt: string = `Welcome to party!`;
  lat: number = 51.678418;
 lng: number = 7.809007;
distance: String;
users$: Object;
map = null;
latitudedata =[];
mapData = [];


selectedOption: string;
markers = [];
constructor(
            private _demoService: MapService,
            private dataService:DataService
          ) { }

  ngOnInit() {



    //  data => {console.log(data); console.log(data);}






      this._demoService.getFoods().subscribe(datas => {
        //this.users$ = datas;
        console.log("datasssss",datas)





        this.latitudedata = this.arrayMap(datas, (loc, index) =>{
          return {
                   id: index, lat: loc.latitude,
                   lng: loc.longitude , myName: loc.name ,
                   type:loc.userType ,
                   distance : loc.distanceFromGrid ,
                   locationname :loc.location ,
                   balanceamount :loc.balanceAmount,
                   priceperkwh:loc.pricePerKWH
              }
            });
        console.log("latitudedata",this.latitudedata);
        console.log("latitudedatazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",this.latitudedata);

      
       this.getMarkersAndLoadMap(this.latitudedata);
      
      });





    }

    arrayMap(obj, fn){
      var aray = [];
      for(var i = 0; i < obj.length; i++)
      {
             aray.push(fn(obj[i], i));
     }
               return aray;

      }

    mapReady(map){
      const bounds: LatLngBounds = new google.maps.LatLngBounds();
      for (const mm of this.markers) {
        if(mm.lat != 0 && mm.lng != 0)
        console.log("marker",mm)
        bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
      }

      map.fitBounds(bounds);
    }

    ngAfterViewInit() {
    }




    getMarkersAndLoadMap(latsnlongs){
      this.markers = latsnlongs;
    }













    mapIdle() {
       console.log('idle');
     }



clickedMarker(users$){
     console.log("fff");

     const nyc = new google.maps.LatLng(users$.lat, users$.lng);
       const london = new google.maps.LatLng(47.381714, 8.568479);
       const distance = google.maps.geometry.spherical.computeDistanceBetween(nyc, london);
       const d = distance/1000
       const r = Math.floor(d)
       this.distance = r+ " "+"km"
       console.log(d +" "+ "Km away");


}

icon = {
          url: 'http://localhost:4200/assets/img/geopower.png',
          // scaledSize: {
          //   width: 64,
          //   height: 64
          // }
          //https://cdn0.iconfinder.com/data/icons/map-location-solid-style/91/Map_-_Location_Solid_Style_28-128.png
          //https://cdn3.iconfinder.com/data/icons/male-user-icons-2/500/muser-location2-128.png
        //  https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-128.png
        //  https://cdn4.iconfinder.com/data/icons/business-finance-vol-13-1/512/15-128.png
}


onMouseOver(infoWindow, gm) {

        if (gm.lastOpen != null) {
          console.log("not open")
            gm.lastOpen.close();
        }

        gm.lastOpen = infoWindow;


        infoWindow.open();
        console.log("open")
    }


onClickInfoView(users$){
  console.log("my new user lat is" + " "+ users$.lat)

}


}
