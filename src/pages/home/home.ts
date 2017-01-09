import { Component } from '@angular/core';
import { LoadingController ,NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';
import { ResultPage } from '../result/result';
import { AboutPage } from '../about/about';
import { MyPagePage } from '../my-page/my-page';
import { NgModule } from '@angular/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public date : any;
  resultpg = ResultPage;

  public countryArray = [];
  public cityArray = [];
  public filteredCity=[];
  public guestColumn=[];
  public roomColumn=[];

  isDisable = true;


  public checkinmin;
  public checkoutmin;

  public minin;
  public minout;

  constructor(public navCtrl: NavController,
              public http   : Http, public loadingController: LoadingController)
  {

      this.checkinmin = new Date();
      this.checkoutmin = new Date();
      this.checkoutmin.setDate(this.checkinmin.getDate()+1);


      this.minin = this.checkinmin.toISOString();
      this.minout= this.checkoutmin.toISOString();

      var todaydate = new Date();
      var aftertodaydate = new Date();
      aftertodaydate.setDate(aftertodaydate.getDate()+1);


      this.todo.checkin   = todaydate.toISOString();
      this.todo.checkout  = aftertodaydate.toISOString();

      /*
      this.checkoutmin.setDate(this.checkinmin.getDate()+1);
      this.checkoutmin.toISOString();
      this.checkoutmin.toISOString();
      */

      console.log(new Date());

      var todaydate = new Date();
      //this.todo.checkin = todaydate.getFullYear()+"-"+todaydate.getMonth()+"-"+ todaydate.getDate();

      /*
      this.todo.checkin = new Date().toISOString() ;
      var checkout = new Date();
      checkout.setDate(checkout.getDate() + 1);

      this.todo.checkout = checkout.toISOString();
      */
      this.date = new Date().toISOString();



    this.countryArray.push(
        {
          code:'MA05110001',
          name:'Thailand'
        },
        {
          code:'MA05110069',
          name:'Singapore'
        }
      );

      this.cityArray.push(
        {
          countrycode:'MA05110001',
          code:'MA05110041',
          name:'Bangkok'
        },
        {
          countrycode:'MA05110001',
          code:'MA05110067',
          name:'Phuket'
        },
        {
          countrycode:'MA05110069',
          code:'MA05110906',
          name:'Singapore '
        }
      );

      for(var i=1;i<=30;i++){
        this.guestColumn.push(i);
      }
      for(var i=1;i<=8;i++){
        this.roomColumn.push(i);
      }
      //this.convertToID();
  }

  logCheckin(checkin) {
    console.log(checkin);
    var date = new Date(checkin);

    var checkoutd = new Date(this.todo.checkout);
    if (date >= checkoutd) {
      date.setDate(date.getDate() + 1);

      this.todo.checkout = date.toISOString();
      this.minout = date.toISOString();
    }
    else{
      date.setDate(date.getDate() + 1);
      this.minout = date.toISOString();
    }
  }

  logCheckout(checkin){
    console.log(checkin);
  }

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  ionViewWillEnter()
  {
    //this.loadXML();
  }

  cekEmptyCity(){
    if(this.filteredCity.length == 0){
      alert('Pilih Negara Terlebih Dahulu!');
    }
  }

  filterArray(key) {
    this.filteredCity = [];
    for(var i=0;i<this.cityArray.length;i++){
      if(this.cityArray[i].countrycode == key){
        this.filteredCity.push(this.cityArray[i]);
      }
    }
    if(this.filteredCity.length != 0){
      this.isDisable = false;
    }
    else{
      this.isDisable = true;
    }
  }

  //event ketika button di list di klik
  buttonClick(event){
    console.log("button clicked");
    console.log(event);
  }

  //event ketika list item di klik
  itemClicked(event,itemData){
    console.log("item clicked");
    console.log(event);
    console.log(itemData);
    alert('oy');
  }


  todo = {
    destination: '',
    guest: '',
    room: '',
    checkin: '',
    country: '',
    checkout: ''
  };

  logForm(form) {
    //console.log(this.todo.checkin);

    //this.loadXML(this.todo);
    //this.navCtrl.push(AboutPage);

    this.todo.checkin = this.todo.checkin.split("T")[0];
    this.todo.checkout = this.todo.checkout.split("T")[0];

    this.navCtrl.push(ResultPage, {
      param1: this.todo
    });


  }




}

