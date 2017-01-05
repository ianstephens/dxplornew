import { Component } from '@angular/core';
import { LoadingController ,NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public xmlItems : any;

  constructor(public navCtrl: NavController,
              public http   : Http, public loadingController: LoadingController)
  {

  }



  ionViewWillEnter()
  {
    //this.loadXML();
  }



  loadXML(todo)
  {

    let headers = new Headers({ 'Content-Type': 'application/xml' });
    let options = new RequestOptions({ headers: headers });
    var reqVar = 'requestXML=<?xml version="1.0" encoding="utf-8" ?><Service_GetHotelDetail><AgentLogin> <AgentId>DXMG</AgentId> <LoginName>DXMG</LoginName> <Password>DXMGT2016</Password> </AgentLogin> <GetHotelDetail_Request> <HotelId>WSMA0511000113</HotelId> </GetHotelDetail_Request> </Service_GetHotelDetail>';

    let loader = this.loadingController.create({
          content: "Mencari hotel..."
        });  
    loader.present();    
this.http.get("http://joomla.ternaku.com/testes.php?destination="+todo.destination+"&checkin="+todo.checkin+"&checkout="+todo.checkout+"&guest="+todo.guest+"&room="+todo.room+"&country="+todo.country)
      .map(res => res.text())
      .subscribe((data)=>
      {
          this.parseXML(data)
          loader.dismiss()

          .then((data)=>
          {
            this.xmlItems = data;
         });
      });

    /*this.http.get('/assets/coba.xml')
      .map(res => res.text())
      .subscribe((data)=>
      {
        this.parseXML(data)
          .then((data)=>
          {
            this.xmlItems = data;
            console.log(data);
          });
      });
    this.parseXML(data1).then((data)=>
    {
      this.xmlItems = data;
      console.log(data);
    });*/
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
        console.log(obj);

        for(k in item.Hotel) {
          var data = item.Hotel[k];
          var data1 = data.$;
          console.log(data1);

          arr.push({
            name: data1.HotelName

          });
          resolve(arr);
        }

        });


    });
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
    console.log(form.value)
    this.loadXML(this.todo);
  }

}

