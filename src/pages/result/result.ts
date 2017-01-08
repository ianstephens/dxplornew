import { Component } from '@angular/core';
import { LoadingController ,NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';
import { DetailHotelPage } from '../detail-hotel/detail-hotel';

@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})

export class ResultPage {

  public hotelData : any;

  public hotelarray = [];

  public param : any;

  loader :any;
  constructor(public navCtrl: NavController,
              public http   : Http, public loadingController: LoadingController, public navParams: NavParams)
  {

      //this.convertToID();
    this.loader = this.loadingController.create({
      content: "Mencari hotel..."
    });
    this.loader.present();

    this.param = navParams.get('param1');
    this.loadXML(this.param);

  }


  loadXML(todo)
  {

this.http.get("http://joomla.ternaku.com/testes.php?destination="+todo.destination+"&checkin="+todo.checkin+"&checkout="+todo.checkout+"&guest="+todo.guest+"&room="+todo.room+"&country="+todo.country)
      .map(res => res.text())
      .subscribe((data)=>
      {
          this.parseXML(data)
          .then((data)=>
          {
            this.hotelData = data;
            this.loader.dismiss();
         });
      });
  }


  parseXML(data)
  {
    return new Promise(resolve =>
    {
      var k,
        arr    = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });

      parser.parseString(data, function (err, result)
      {
        var obj = result.Service_SearchHotel;
        var item = obj.SearchHotel_Response[0];
        //console.log(obj);
        for(k in item.Hotel) {
          var data = item.Hotel[k];
          var data1 = data.$;
          var roomcateg = data.RoomCateg;
          var roomcateg2 = roomcateg[k];
          var roomcateg3 = roomcateg2.$;
          console.log(roomcateg);

          arr.push({
            nama : data1.HotelName,
            currency:data1.Currency,
            id:data1.HotelId,
            rating: data1.Rating,
            netprice:roomcateg3.NetPrice
          });
        }
        resolve(arr);
        });
    });
  }


 getNumber (num) {
  return new Array(parseInt(num, 10));
};
  //event ketika button di list di klik
  buttonClick(value){
    //alert(value);
    this.navCtrl.push(DetailHotelPage,{
      hotelid: value
    });
  }

  //event ketika list item di klik
  itemClicked(event,itemData){
    console.log("item clicked");
    console.log(event);
    console.log(itemData);
  }


  todo = {
    destination: '',
    guest: '',
    room: '',
    checkin: '',
    country: '',
    checkout: ''
  };



}

