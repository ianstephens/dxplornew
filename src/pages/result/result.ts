import { Component } from '@angular/core';
import { LoadingController ,NavController, NavParams, ModalController } from 'ionic-angular';
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

  public fullResponseArray :any;
  public hotelarray = [];

  public param : any;

  public isEmpty = false;
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

this.http.get("http://joomla.ternaku.com/ServiceSearchHotel.php?destination="+todo.destination+"&checkin="+todo.checkin+"&checkout="+todo.checkout+"&guest="+todo.guest+"&room="+todo.room+"&country="+todo.country)
      .map(res => res.text())
      .subscribe((data)=>
      {
          this.parseXML(data)
          .then((data)=>
          {
              this.fullResponseArray = data;
              this.hotelData = this.fullResponseArray.Hotel;

            console.log(this.hotelData[0].$.HotelName);

            this.loader.dismiss();

            /*
            if(this.hotelData.length != 0){
              this.isEmpty = false;
            }else{
              this.isEmpty = true;
            }*/
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
        var obj = result.Service_SearchHotel;
        var item = obj.SearchHotel_Response[0];

        arr = item;
        console.log(arr);
        /*
        console.log(item)
          //console.log(obj);
          for (k in item.Hotel) {
            var data = item.Hotel[k];
            var data1 = data.$;

            // console.log(data);
            var hotelRoomArr = [];
            for (let l in data.RoomCateg) {
              var roomcateg = data.RoomCateg[l].$;
              var roomcategloop = data.RoomCateg[l];

              // console.log(roomcategloop.RoomType);
              var roomtypeArr = [];

              for (let m in roomcategloop.RoomType) {
                var roomtype = roomcategloop.RoomType[m].$;
                var roomtypeloop = roomcategloop.RoomType[m];
                var roomRateArr = [];

                for (let n in roomtypeloop.Rate) {
                  var roomRate = roomtypeloop.Rate[n].$;
                  var roomRateLoop = roomtypeloop.Rate[n];

                  // console.log(roomRateLoop);
                  var roomRateContentArr = [];

                  var roomRateInfo = [];
                  var roomRateInfoContent = roomRateLoop.RoomRateInfo[0];


                  roomRateInfo.push({
                    roomratechild: roomRateInfoContent.Child,
                    roomratepromotion: roomRateInfoContent.RatePromotion,
                    roomrateminstay: roomRateInfoContent.Minstay,
                    roomratecompulsory: roomRateInfoContent.Compulsory,
                    roomratesupplement: roomRateInfoContent.Supplement,
                    roompromotion: roomRateInfoContent.Promotion,
                    roomrateearlybird: roomRateInfoContent.EarlyBird,
                    roomratecommission : roomRateInfoContent.Commission
                  });

                  for (let o in roomRateLoop.RoomRate) {
                    var roomRateContent = roomRateLoop.RoomRate[o];
                    var roomSeqArr = [];

                    for (let p in roomRateContent.RoomSeq) {
                      var roomSeq = roomRateContent.RoomSeq[p].$;

                      roomSeqArr.push({
                        adultnum: roomSeq.AdultNum,
                        childnum: roomSeq.ChildNum,
                        roomprice: roomSeq.RoomPrice,
                        minstayprice: roomSeq.MinstayPrice,
                        compulsoryprice: roomSeq.CompulsoryPrice,
                        supplementprice: roomSeq.SupplementPrice,
                        promotionbfprice: roomSeq.PromotionBFPrice,
                        earlybirddiscount: roomSeq.EarlyBirdDiscount,
                        commissionprice: roomSeq.CommissionPrice,
                        sroomtype: roomSeq.sRoomType
                      });
                    }

                    roomRateContentArr.push({
                      roomratecontent : roomSeqArr
                    });
                  }

                  roomRateArr.push({
                    offset: roomRate.offSet,
                    nightprice: roomRate.NightPrice,
                    roomratecontent: roomRateContentArr,
                    roomrateinfo : roomRateInfo
                  });

                }

                roomtypeArr.push({
                  typename: roomtype.TypeName,
                  numrooms: roomtype.NumRooms,
                  totalprice: roomtype.TotalPrice,
                  avrnightprice: roomtype.avrNightPrice,
                  rtgrossprice: roomtype.RTGrossPrice,
                  rtcommprice: roomtype.RTCommPrice,
                  netprice: roomtype.RTNetPrice,
                  roomRate: roomRateArr
                });

              }

              hotelRoomArr.push({
                code: roomcateg.Code,
                name: roomcateg.Name,
                netprice: roomcateg.NetPrice,
                grossprice: roomcateg.GrossPrice,
                commprice: roomcateg.CommPrice,
                price: roomcateg.Price,
                bftype: roomcateg.BFType,
                roomtype: roomtypeArr
              });
            }
            //console.log(data);

            arr.push({
              hotelid: data1.HotelId,
              nama: data1.HotelName,
              currency: data1.Currency,
              id: data1.HotelId,
              rating: data1.Rating,
              marketname: data1.MarketName,
              dtcheckin: data1.dtCheckIn,
              dtcheckout: data1.dtCheckOut,
              cancelpolicyid:data1.CancelPolicyId,
              internalcode:data1.InternalCode,
              avail:data1.avail,
              roomcategory: hotelRoomArr
            });
          }*/
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
      hoteldata: value,
      bookdata:this.param
    });
  }



  //event ketika list item di klik
  itemClicked(event,itemData){
    //console.log(itemData.roomcategory[0].roomtype[0].typename);
    console.log(itemData.roomcategory[0]);
  }


  todo = {
    destination: '',
    guest: '',
    room: '',
    checkin: '',
    country: '',
    checkout: ''
  };

  findLowestPrice(roomcategory){
    var min=roomcategory[0].$.NetPrice;
    for(var i=0;i<roomcategory.length;i++){
      if(roomcategory[i].$.NetPrice < min){
        min = roomcategory[i].$.NetPrice;
      }
    }
    return min;
  }

  barTitle(){

    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

    var datein = new Date(this.param.checkin);
    var dateout = new Date(this.param.checkout);

    var diffDays = Math.round(Math.abs((datein.getTime() - dateout.getTime())/(oneDay)));


    return days[datein.getDay()]+ ", "+ datein.getDate() +" "+
      monthNames[datein.getMonth()] + ' → ' +days[dateout.getDay()] + ", "+
      dateout.getDate() + " " +monthNames[dateout.getMonth()] +" | "+diffDays+" night(s) | "+this.param.guest +" guest(s)" ;
  }
}

