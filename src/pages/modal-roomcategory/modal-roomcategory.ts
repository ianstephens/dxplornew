import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {RoomTypePage} from "../room-type/room-type";

/*
  Generated class for the ModalRoomcategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-roomcategory',
  templateUrl: 'modal-roomcategory.html'
})
export class ModalRoomcategoryPage {

  hoteldata:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController
  ) {
    this.hoteldata = navParams.get('hoteldata');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalRoomcategoryPage');
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  showRoomTypeDetail(roomtype){
      this.navCtrl.push(RoomTypePage,{
        roomtype: roomtype
      });
  }

}
