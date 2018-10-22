import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../services/auth.service';
import * as alertify from 'alertify.js';
declare var $:any;


@Component({
  selector: "app-user-trade",
  templateUrl: "./user-trade.component.html",
  styleUrls: ["./user-trade.component.css"]
})
export class UserTradeComponent implements OnInit {
  energyProductionDetails: any;

  //responseData :Object;
  responseData = [];
  individualData: any;
  resouceEngergy: any;
  productionDetail: any;
  userId: any;
  sellerId: any;
  prosumer: any;
  buyersopenToOffer = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(res => {
      this.userId = res["user"]._id;
    });

    this.dataService.getMix(this.userId).then(res => {
      console.log(res["userType"]);
      //this.consumer = res['userType'];
      if (res["userType"] == "PROSUMER") {
        this.prosumer = res["userType"];
      }
    });

    this.dataService.getBuyersOpenToOffer().subscribe(res => {
      this.arrayMap(res, item => {
        this.buyersopenToOffer.push(item);
      });
      console.log("BuyersToOffer  ", this.buyersopenToOffer);
    });

    this.dataService.getPowerStorateData().subscribe(res => {
      this.arrayMap(res, item => {
        if (item.energyProductionDetails.length > 0) {
          this.responseData.push(item);
        }
      });
    });
  }

  arrayMap(obj, fn) {
    var aray = [];
    for (var i = 0; i < obj.length; i++) {
      aray.push(fn(obj[i]));
    }
    return aray;
  }

  openEnergyModal(id: any) {
    this.sellerId = id;
    console.log("I clicked at id", id);

    this.dataService.getPowerStorageDataByUserId(id).subscribe(res => {
      //console.log('user detail',res);
      this.individualData = res;
      this.resouceEngergy = this.individualData["energyProductionDetails"][0][
        "energyResource"
      ];
      this.productionDetail = this.individualData["energyProductionDetails"][0][
        "production"
      ];
      console.log(
        "Result",
        this.individualData["energyProductionDetails"][0]["energyResource"]
      );
      console.log(
        "Production",
        this.individualData["energyProductionDetails"][0]["production"]
      );
    });
  }

  submit(f) {
    var purchaseAmount = f.value.purchase;

    console.log(f.value.purchase);
    console.log("UserId is inside buy engery", this.userId);

    if (this.userId) {
      var sellerDetail = {
        $class: "waltson.poc.hyperledger.buyEnergy",
        buyer: "resource:waltson.poc.hyperledger.User#" + this.userId,
        seller: "resource:waltson.poc.hyperledger.User#" + this.sellerId,
        grid: "resource:waltson.poc.hyperledger.Grid#111",
        purchaseUnitKWH: purchaseAmount,
        energyResource: this.resouceEngergy
      };

      this.dataService.buyEnergy(sellerDetail).subscribe(res => {
        console.log("Response is ", res);
        if (res) {
          alertify
            .logPosition("top right")
            .success("Energy brought sucessfully"); //example
          $("#sell-energy").modal("hide");
        }
      });
    }
  }
}
