import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import xml2js from 'xml2js';
import 'rxjs/add/operator/map';
import { BookHotelPage } from '../book-hotel/book-hotel';
import { Http } from '@angular/http';

/*
  Generated class for the RoomType page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-room-type',
  templateUrl: 'room-type.html'
})
export class RoomTypePage {
  roomtype:any;
  roomtype$:any;

  hoteldata;
  bookdata;

  rsvndata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http   : Http) {
    this.roomtype = navParams.get('roomtype');

    this.hoteldata = navParams.get('hotel');
    this.bookdata = navParams.get('bookdata');

    //this.roomtype$ =this.roomtype.$;
    //this.loadData();
    //console.log(this.roomtype[0])
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RoomTypePage');
  }

  showRoomTypeDetail(roomRate){
    console.log(roomRate)
    var roomrate = roomRate.RoomRate;
      for(let r in roomrate){
        var roomSeq = roomrate[r].RoomSeq;
        for(let s in roomSeq){
          var roomSeqContent = roomSeq[s].$
          console.log(roomSeqContent.RoomPrice);
        }
      }
  }

  bookHotel(){
    console.log(this.hoteldata);
    console.log(this.bookdata);
    this.navCtrl.push(BookHotelPage,{param2:this.bookdata});
  }

  loadData()
  {
    this.http.get("http://joomla.ternaku.com/GetRsvnInfo.php")
      .map(res => res.text())
      .subscribe((data)=>
      {
        this.parseXML(data)
          .then((data)=>
          {
            this.rsvndata = data;
            //this.loader.dismiss();
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
        console.log(result);
        arr.push({

        });

        resolve(arr);

      });
    });
  }

}
