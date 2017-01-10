import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import xml2js from 'xml2js';
import { ModalController } from 'ionic-angular';
import {ModalRoomcategoryPage} from "../modal-roomcategory/modal-roomcategory";
import {RoomTypePage} from "../room-type/room-type";


/*
  Generated class for the DetailHotel page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-hotel',
  templateUrl: 'detail-hotel.html'
})
export class DetailHotelPage {

  public hoteldata : any;
  public hotelDetail:any;

  public bookdata;

  public policyArray :any;

  public facility = [];


  public id:any;
  public nama :any;
  public jumlah_ruangan :any;
  alamat1 :any;
  alamat2 :any;
  alamat3 :any;
  benua :any;
  region :any;
  lokasi :any;
  telepon :any;
  fax :any;
  email :any;
  website :any;
  rating :any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http   : Http,
              public alertCtrl: AlertController,public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController) {

    this.hoteldata = navParams.get('hoteldata');
    this.bookdata = navParams.get('bookdata');


    console.log(this.hoteldata);
    this.loadData(this.hoteldata.$.HotelId);

  }

  presentActionSheet(){

    var actionSheetArr = [];
    for(var i=0;i<this.hoteldata.RoomCateg.length;i++) {
      var roomcategory = this.hoteldata.RoomCateg[i].$;
      var roomcat = this.hoteldata.RoomCateg[i];
      actionSheetArr.push(
        {
          text: roomcategory.Name + " (USD " + roomcategory.NetPrice + ")",
          handler: () => {
            this.navCtrl.push(RoomTypePage, {
              roomtype: roomcat.RoomType,
              hotel : this.hoteldata.$,
              bookdata: this.bookdata
            });
          }
        }
      )
    }
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Room Type',
      buttons: actionSheetArr
    });
    actionSheet.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailHotelPage');
  }

  presentModal(hoteldata) {

    this.navCtrl.push(ModalRoomcategoryPage,{
      hoteldata: hoteldata
    });

    /*
    let modal = this.modalCtrl.create(ModalRoomcategoryPage , {"hoteldata": hoteldata});
    modal.present();
    */
  }

  loadCancelPolicy()
  {

    this.http.get("http://joomla.ternaku.com/ViewCancelPolicy.php")
      .map(res => res.text())
      .subscribe((data)=>
      {
        this.parseXMLCancelPolicy(data)
          .then((data)=>
          {
            //this.hotelData = data;

            //this.rating = data[0].rating;
            this.policyArray = data;
            console.log(this.policyArray);
            this.showAlert(this.policyArray.Policies[0]);
            //this.loader.dismiss();
          });
      });
  }

  showAlert(policies) {
    var policy = '';
    for(var i=0;i<policies.Policy.length;i++){
      var pol = policies.Policy[i];
      if(i!=policies.Policy.length){
        policy += (i+1)+'. '+ pol.Description[0] + "<br>" +"- Charge Type : " + pol.ChargeType[0]+" <br>" + "- Ex Cancel Days : " +pol.ExCancelDays[0] + "<br><br>";
      }else{
        policy += (i+1)+'. '+ pol.Description[0] + "<br>" +"- Charge Type : " + pol.ChargeType[0] +"<br>" + "- Ex Cancel Days : " +pol.ExCancelDays[0] ;
      }
    }
    let alert = this.alertCtrl.create({
      title: 'Cancel Policy',
      subTitle:policy,
      buttons: ['Tutup']
    });
    alert.present();
  }

  CancelPolicy = {
    excanceldays: '',
    chargerate: '',
    chargetype: '',
    description: ''
  };

  loadData(hotelid)
  {

    this.http.get("http://joomla.ternaku.com/GetHotelDetail.php?hotelid="+hotelid)
      .map(res => res.text())
      .subscribe((data)=>
      {
        this.parseXML(data)
          .then((data)=>
          {
              this.hotelDetail = data;
              console.log(this.hotelDetail.HotelName[0]);

            this.id = this.hotelDetail.HotelId[0];
            this.nama = this.hotelDetail.HotelName[0];
            this.jumlah_ruangan  = this.hotelDetail.HotelRooms[0];
            this.alamat1 = this.hotelDetail.Address1[0];
            this.alamat2  = this.hotelDetail.Address2[0];
            this.alamat3  = this.hotelDetail.Address3[0];
            this.benua  = this.hotelDetail.Continent[0];
            this.region = this.hotelDetail.Region[0];
            this.lokasi  = this.hotelDetail.Location[0];
            this.telepon  = this.hotelDetail.Telephone[0];
            this.fax = this.hotelDetail.Facsimile[0];
            this.email = this.hotelDetail.Email[0];
            this.website = this.hotelDetail.Website[0];
            this.rating = this.hotelDetail.HotelRooms[0];
            //console.log(this.hotelDetail);
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
        var obj = result.Service_GetHotelDetail;
        var item = obj.GetHotelDetail_Response[0];

        arr = item;
        resolve(arr);

      });
    });
  }


  openURL(url){
    console.log(url)
    window.open("http://"+url, '_blank', 'location=no');
  }


  parseXMLCancelPolicy(data)
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
        var obj = result.Service_ViewCancelPolicy;
        var item = obj.ViewCancelPolicy_Response[0];

        arr = item;
       // console.log(item);
        resolve(arr);

      });
    });
  }


}
