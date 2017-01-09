import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.roomtype = navParams.get('roomtype');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomTypePage');
  }

}
