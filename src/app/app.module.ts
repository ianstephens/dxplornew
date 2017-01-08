import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResultPage } from '../pages/result/result';
import {DetailHotelPage} from "../pages/detail-hotel/detail-hotel";
import {VcancelpolicyPage} from "../pages/vcancelpolicy/vcancelpolicy";
import { MultiPickerModule } from 'ion-multi-picker';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultPage,
    DetailHotelPage,
    VcancelpolicyPage
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
    VcancelpolicyPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
