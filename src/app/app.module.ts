import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResultPage } from '../pages/result/result';
import {DetailHotelPage} from "../pages/detail-hotel/detail-hotel";
import {VcancelpolicyPage} from "../pages/vcancelpolicy/vcancelpolicy";
import {ModalRoomcategoryPage} from "../pages/modal-roomcategory/modal-roomcategory";
import {RoomTypePage} from "../pages/room-type/room-type";
import {ReservationInfoPage} from "../pages/reservation-info/reservation-info";
import {ModifyReservationPage} from "../pages/modify-reservation/modify-reservation";
import {BookHotelPage} from "../pages/book-hotel/book-hotel";

import { MultiPickerModule } from 'ion-multi-picker';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultPage,
    DetailHotelPage,
    VcancelpolicyPage,
    ModalRoomcategoryPage,
    RoomTypePage,
    ReservationInfoPage,
    ModifyReservationPage,
    BookHotelPage
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
    RoomTypePage,
    ReservationInfoPage,
    ModifyReservationPage,
    BookHotelPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
