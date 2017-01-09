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

  public policyArray :any;



  public facility = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public http   : Http,
              public alertCtrl: AlertController,public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController) {

    this.hoteldata = navParams.get('hoteldata');
    this.loadData(this.hoteldata.id);

  }

  presentActionSheet(){

    var actionSheetArr = [];
    for(var i=0;i<this.hoteldata.roomcategory.length;i++) {
      var roomcategory = this.hoteldata.roomcategory[i];
      actionSheetArr.push(
        {
          text: roomcategory.name + " (USD " + roomcategory.netprice + ")",
          handler: () => {
            this.navCtrl.push(RoomTypePage, {
              roomtype: roomcategory.roomtype
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
            this.showAlert(this.policyArray);
            //this.loader.dismiss();
          });
      });
  }

  showAlert(policies) {
    var policy = '';
    for(var i=0;i<policies.length;i++){
      if(i!=policies.length){
        policy += (i+1)+'. '+ policies[i].description + "<br>" +"- Charge Type : " + policies[i].chargetype+" <br>" + "- Ex Cancel Days : " +policies[i].excanceldays + "<br><br>";
      }else{
        policy += (i+1)+'. '+ policies[i].description + "<br>" +"- Charge Type : " + policies[i].chargetype +"<br>" + "- Ex Cancel Days : " +policies[i].excanceldays ;
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
            //this.hotelData = data;
            this.id = data[0].id;
            this.nama = data[0].nama;
            this.jumlah_ruangan = data[0].jumlah_ruangan;
            this.alamat1 = data[0].alamat1;
            this.alamat2 = data[0].alamat2;
            this.alamat3 = data[0].alamat3;
            this.benua = data[0].benua;
            this.region = data[0].region;
            this.lokasi = data[0].lokasi;
            this.telepon = data[0].telepon;
            this.fax = data[0].fax;
            this.email = data[0].email;
            this.website = data[0].website;
            this.rating = data[0].rating;
            //this.loader.dismiss();
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


        var policies = item.Policies[0];
        //console.log(policies);
        for(k in policies.Policy) {
         // console.log(k.Policy);
          var data = policies.Policy[k];
          console.log(data)

          arr.push({
              excanceldays   : data.ExCancelDays,
              chargerate:data.ChargeRate,
              chargetype:data.ChargeType,
              description:data.Description
          });
        }

       // console.log(item);


        resolve(arr);

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

        arr.push({
          id   : item.HotelId,
          nama : item.HotelName,
          jumlah_ruangan : item.HotelRooms,
          rating : item.Rating,
          alamat1 : item.Address1,
          alamat2 : item.Address2,
          alamat3 : item.Address3,
          benua  : item.Continent,
          region : item.Region,
          lokasi : item.Location,
          telepon : item.Telephone,
          fax : item.Facsimile,
          email : item.Email,
          website : item.Website
        });

        resolve(arr);

      });
    });
  }
}
