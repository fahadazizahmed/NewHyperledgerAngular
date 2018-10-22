import { Component, OnInit,ViewChild } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';
import { Observable } from "rxjs/Observable";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {UserEnergyMixComponent} from '../user-energy-mix/user-energy-mix.component'

declare var $:any;
declare var Highcharts:any;
@Component({
  selector: 'app-user-panel-navbar',
  templateUrl: './user-panel-navbar.component.html',
  styleUrls: ['./user-panel-navbar.component.css']
})
export class UserPanelNavbarComponent implements OnInit {

  @ViewChild(NavbarComponent ) navbar: NavbarComponent;

  @ViewChild(UserEnergyMixComponent) energyMix:UserEnergyMixComponent;

  user:string;
   energies:any;
   timestamps:any;
   userBalanceAmount:any;
   totalEnergyConsumed:any;
   userId:any;
 // consumptions[]:any;
 EnergyPercentage:any;
 EnergyName:any;

 //New Variables for Energy Values

 engergyResources = ['WIND_POWER' ,'SOLAR_POWER','NUCLEAR','GEO_POWER','BIO','GAS', 'COAL','DIESEL'];
  windPower_totalPercentage :any = 0;
  windPower_engergyResource:any;
  windPower_totalunitsPurchased:any = 0;

  solarPower_totalPercentage :any = 0;
  solarPower_engergyResource:any;
  solarPower_totalunitsPurchased:any = 0;

  nuclear_totalPercentage :any = 0;
  nuclear_engergyResource:any;
  nuclear_totalunitsPurchased:any = 0;

  geoPower_totalPercentage :any = 0;
  geoPower_engergyResource:any;
  geoPower_totalunitsPurchased:any = 0;

  bioPower_totalPercentage :any = 0;
  bioPowoer_engergyResource:any;
  bioPower_totalunitsPurchased:any = 0;

  gasPower_totalPercentage :any = 0;
  gasPower_engergyResource:any;
  gasPower_totalunitsPurchased:any = 0;


  coalPower_totalPercentage :any = 0;
  coalPower_engergyResource:any;
  coalPower_totalunitsPurchased:any = 0;


  dieselPower_totalPercentage :any = 0;
  dieselPower_engergyResource:any;
  dieselPower_totalunitsPurchased:any = 0;

  constructor(
              private authService:AuthService,
              private dataService:DataService,
              private router:Router,
              private spinnerService: Ng4LoadingSpinnerService,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {



    this.authService.getProfile().subscribe(profile => {

        this.user = profile['user']['username'];
        
        this.userId = profile['user']._id;
        console.log('Profilezzzzz iss', this.userId);
        this.spinnerService.hide();
      },
       err => {
         this.spinnerService.hide();
         return false;
       });



    setTimeout(()=>{

    

    console.log('Userzzz id is ', this.userId);
    this.dataService.getConsumption(this.userId).subscribe(res =>{
      
        console.log('I am inside consumption ', res);
        this.energies = this.arrayMap(res, item => item.energyConsumed);
        this.timestamps = this.arrayMap(res, item => item.timestamp.split("T")[0])

        this.renderHighchart();
        // $("body").on('click', '.sidebar-toggle', function(){
        //     if($("body").hasClass("is-collapsed")){
        //       $(".rengoo-logo").removeClass("mobile");
        //       $(".rengoo-logo").attr("src", "../../../assets/img/logo.png");
        //     }else{
        //       $(".rengoo-logo").addClass("mobile");
        //       $(".rengoo-logo").attr("src", "../../../assets/img/logo2.png");
        //     }
        // });
        // $('.sidebar').on('mouseenter', function(){
        //   if(!$("body").hasClass("is-collapsed")){
        //     $(".rengoo-logo").removeClass("mobile");
        //     $(".rengoo-logo").attr("src", "../../../assets/img/logo2.png");
        //   }
        // });
        // $('.sidebar').on('mouseleave', function(){
        //   if(!$("body").hasClass("is-collapsed")){
        //     $(".rengoo-logo").addClass("mobile");
        //     $(".rengoo-logo").attr("src", "../../../assets/img/logo2.png");
        //   }
        // });
        // if($("body").hasClass("is-collapsed")){
        //   $(".rengoo-logo").removeClass("mobile");
        //   $(".rengoo-logo").attr("src", "../../../assets/img/logo.png");
        // }else{
        //   $(".rengoo-logo").addClass("mobile");
        //   $(".rengoo-logo").attr("src", "../../../assets/img/logo2.png");
        // }
    });

  },3000);

    this.dataService.getMix(this.userId).then(res=>{
      res['energyConsumption'].forEach(element => {
        if(element.energyResource == 'WIND_POWER'){
          this.windPower_engergyResource = 'WIND POWER';
          this.windPower_totalPercentage += element.percentage;
          this.windPower_totalunitsPurchased +=element.unitsPurchased;



        }
        if(element.energyResource == 'SOLAR_POWER'){
          this.solarPower_engergyResource = 'SOLAR POWER';
          this.solarPower_totalunitsPurchased += element.unitsPurchased;
          this.solarPower_totalPercentage += element.percentage;

        }

        if(element.energyResource === 'NUCLEAR'){
          this.nuclear_engergyResource = 'NUCLEAR';
          this.nuclear_totalunitsPurchased += element.unitsPurchased;
          this.nuclear_totalPercentage += element.percentage;

        }

        if(element.energyResource == 'GEO_POWER'){
          this.geoPower_engergyResource = 'GEO POWER';
          this.geoPower_totalunitsPurchased += element.unitsPurchased;
          this.geoPower_totalPercentage += element.percentage;

        }

        if(element.energyResource == 'BIO'){
          this.bioPowoer_engergyResource = 'BIO';
          this.bioPower_totalunitsPurchased += element.unitsPurchased;
          this.bioPower_totalPercentage += element.percentage;

        }

        if(element.energyResource == 'GAS'){
          this.gasPower_engergyResource = 'GAS';
          this.gasPower_totalunitsPurchased += element.unitsPurchased;
          this.gasPower_totalPercentage += element.percentage;

        }

        if(element.energyResource == 'COAL'){

          this.coalPower_engergyResource = 'COAL';
          this.coalPower_totalunitsPurchased = element.unitsPurchased;
          this.coalPower_totalPercentage += element.percentage;

        }

        if(element.energyResource == 'DIESEL'){
          this.dieselPower_engergyResource = 'DIESEL';
          this.dieselPower_totalunitsPurchased += element.unitsPurchased;
          this.dieselPower_totalPercentage += element.percentage;

        }


      });
    });



     this.dataService.getMix(this.userId).then(res=>{
        console.log('Response form dataservice', res);
        this.userBalanceAmount = res['balanceAmount'];
        this.totalEnergyConsumed = res['totalEnergyConsumed'];
      });

  }

  arrayMap(obj, fn){
         var aray = [];
         for(var i = 0; i < obj.length; i++)
         {
                aray.push(fn(obj[i]));
        }
                  return aray;
         }


  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass:'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }

  renderHighchart(){
    Highcharts.chart('consumption', {
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Consumption Usage'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: this.timestamps,
            plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .2)'
            }]
        },
        yAxis: {
            title: {
                text: 'Units'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'Energy Consumed',
            data: this.energies
        }]
    });
  }

  getEnergyValues(){

  }

}
