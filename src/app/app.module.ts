import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResultPage } from '../pages/result/result';
import {DetailHotelPage} from "../pages/detail-hotel/detail-hotel";
import {VcancelpolicyPage} from "../pages/vcancelpolicy/vcancelpolicy";
import {ModalRoomcategoryPage} from "../pages/modal-roomcategory/modal-roomcategory";
import {RoomTypePage} from "../pages/room-type/room-type";

import { MultiPickerModule } from 'ion-multi-picker';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultPage,
    DetailHotelPage,
    VcancelpolicyPage,
    ModalRoomcategoryPage,
    RoomTypePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MultiPickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResultPage,
    DetailHotelPage,
    VcancelpolicyPage,
    ModalRoomcategoryPage,
    RoomTypePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
