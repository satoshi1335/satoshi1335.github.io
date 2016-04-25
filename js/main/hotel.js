//create reservation window
function reservationWindow() {
    var address = document.about_hotel.hotel_place.value;
    if (geocoder) {
        geocoder.geocode(
            { 'address': address,'region': 'jp', 'language': 'ja'},
            function (results, status) {
                document.getElementById('hotel_plans').innerHTML = "";
                map.panTo(results[0].geometry.location);
                map.setZoom(12);
                if (status == google.maps.GeocoderStatus.OK) {
                    var toDoubleDigits = function(num){
                        num += "";
                        if (num.length === 1) {
                            num = "0" + num;
                        }
                        return num;    
                    };
                    var myD = new Date(Number(day_info[0]),Number(day_info[1])-1,Number(day_info[2])+Number(document.about_hotel.stay_date.value)-1);
                    var myD2 = new Date(Number(day_info[0]),Number(day_info[1])-1,Number(day_info[2])+Number(document.about_hotel.stay_date.value));
                    var yyyy = myD.getFullYear();
                    var mm = toDoubleDigits(myD.getMonth() + 1);
                    var dd = toDoubleDigits(myD.getDate());
                    var yyyy2 = myD2.getFullYear();
                    var mm2 = toDoubleDigits(myD2.getMonth() + 1);
                    var dd2 = toDoubleDigits(myD2.getDate());
                    var checkinDate =  String(yyyy) + "-" + String(mm)+ "-" + String(dd);
                    var checkoutDate = String(yyyy2) + "-" + String(mm2)+ "-" + String(dd2);
                    var lat = results[0].geometry.location.lat();
                    var lng = results[0].geometry.location.lng();
                    // ongithub we cannot use php
                    
                    // $.get(  "./php/hotel.php",
                    //         {   lat:results[0].geometry.location.lat(),
                    //             lng:results[0].geometry.location.lng(),
                    //             checkinDate:checkinDate,
                    //             checkoutDate:checkoutDate,
                    //             adultNum:num_of_members,
                    //             maxCharge:document.about_hotel.hotel_budget.value,
                    //         },
                    //         function(data){
                    //             var obj = JSON.parse(data);
                    //             for(i=0;i<obj.hotels.length;i++){
                    //                 var element = document.createElement('div');
                    //                 var parking ="<b>駐車場</b>:　";
                    //                 var parking_flg = obj.hotels[i][0].hotelBasicInfo.parkingInformation.match(/有り|有|無し|なし/);
                    //                 var parking_free = obj.hotels[i][0].hotelBasicInfo.parkingInformation.match(/無料/);
                    //                 var start_point =  obj.hotels[i][0].hotelBasicInfo.parkingInformation.search(/ |　|（|。/);
                    //                 var end_point = obj.hotels[i][0].hotelBasicInfo.parkingInformation.lastIndexOf("円");
                    //                 var parking_fee = obj.hotels[i][0].hotelBasicInfo.parkingInformation.match(/[0-9|,|，|０|１|２|３|４|５|６|７|８|９|十|百|千|万|一|二|三|四|五|六|七|八|九|十]{1,5}円|¥¥[0-9|,|，|０|１|２|３|４|５|６|７|８|９|十|百|千|万|一|二|三|四|五|六|七|八|九|十]{1,5}|￥[0-9|,|，|０|１|２|３|４|５|６|７|８|９|十|百|千|万|一|二|三|四|五|六|七|八|九|十]{1,5}|無料/);
                    //                 if(parking_flg!== null){
                    //                     parking += parking_flg;
                    //                 }
                    //                 if(parking_free !==null){
                    //                     parking += " " + parking_free;
                    //                 }
                    //                 if(parking_fee !=null){
                    //                     parking += "　" + parking_fee[0];
                    //                 }
                                                                                    
                    //                 element.className = 'hotels'
                    //                 element.title = obj.hotels[i][0].hotelBasicInfo.hotelName;
                    //                 element.style.position = 'relative';
                    //                 element.style.height =115+"px"; 
                    //                 var content  = 
                    //                                     "<img src='"+
                    //                                     obj.hotels[i][0].hotelBasicInfo.hotelThumbnailUrl +
                    //                                     "' alt='icon' style='position:absolute; left:7%; top:22%;'>"+
                    //                                     "<a href='"+
                    //                                     obj.hotels[i][0].hotelBasicInfo.hotelInformationUrl+
                    //                                     "' target = '_blank'>"+
                    //                                     obj.hotels[i][0].hotelBasicInfo.hotelName+
                    //                                     "</a><br>"+
                    //                                     "<b>評価</b>: ";
                    //                 if(Number(obj.hotels[i][0].hotelBasicInfo.reviewAverage)>=4.8){
                    //                     content +=      "<font color ='#F5B605'>" + 
                    //                                     obj.hotels[i][0].hotelBasicInfo.reviewAverage+
                    //                                     "</font>";
                    //                 }
                    //                 else if(Number(obj.hotels[i][0].hotelBasicInfo.reviewAverage)>=4){
                    //                     content +=      "<font color ='red'>" + 
                    //                                     obj.hotels[i][0].hotelBasicInfo.reviewAverage+
                    //                                     "</font>";
                    //                 }
                    //                 else if(Number(obj.hotels[i][0].hotelBasicInfo.reviewAverage)>=3){
                    //                     content +=      "<font color ='green'>" + 
                    //                                     obj.hotels[i][0].hotelBasicInfo.reviewAverage+
                    //                                     "</font>";
                    //                 }
                    //                 else if(obj.hotels[i][0].hotelBasicInfo.reviewAverage == null){

                    //                 }
                    //                 else{
                    //                     content +=      "<font color ='blue'>" + 
                    //                                     obj.hotels[i][0].hotelBasicInfo.reviewAverage+
                    //                                     "</font>";
                    //                 }
                                        

                    //                 content+=       "　　　" +
                    //                                 parking+
                                                        
                    //                                 "<div class='slider'>"
                    //                                 ;
                                    
                    //                 for(j=2;j<obj.hotels[i].length; j++){
                    //                     var diner_flag;
                    //                     var breakfast_flag;
                    //                     var hotel_cost;
                    //                     if(Number(obj.hotels[i][j].roomInfo[0].roomBasicInfo.withDinnerFlag) ===1 ){
                    //                         diner_flag ="<b>夕食</b>○";
                    //                     }
                    //                     else{
                    //                         diner_flag ="<b>夕食</b>×";
                    //                     }
                    //                     if(Number(obj.hotels[i][j].roomInfo[0].roomBasicInfo.withBreakfastFlag) ===1){
                    //                          breakfast_flag ="<b>朝食</b>○";
                    //                     }
                    //                     else{
                    //                          breakfast_flag ="<b>朝食</b>×";
                    //                     }
                    //                     content += 
                    //                             "<div class='slide'>" +
                    //                             "<div class = 'detail_of_hotel'>"+
                    //                             Number(j-1) + "." +
                    //                             diner_flag + "・" + breakfast_flag + "　　";
                    //                     if(obj.hotels[i][j].roomInfo[1].dailyCharge.chargeFlag == 1){
                    //                         content +=  " <b>金額</b>:"+ obj.hotels[i][j].roomInfo[1].dailyCharge.total + "円/人";
                    //                         hotel_cost = obj.hotels[i][j].roomInfo[1].dailyCharge.total;
                    //                     }
                    //                     else{
                    //                         content +=  " <b>金額</b>:"+ Number(obj.hotels[i][j].roomInfo[1].dailyCharge.total/num_of_members) + "円/人";
                    //                         hotel_cost = Math.round(Number(obj.hotels[i][j].roomInfo[1].dailyCharge.total)/num_of_members);
                    //                     }
                    //                     content+=   
                    //                             "</div>" +
                    //                             "<form name = 'hotel_input'>" + 
                    //                             "<b>チェックイン:</b>"+
                    //                             "<input type ='number' id='checkin"+
                    //                             i + 
                    //                             "a"+
                    //                             j+
                    //                             "' min='"+
                    //                             Number(obj.hotels[i][1].hotelDetailInfo.checkinTime.split(":")[0])+
                    //                             "' max='"
                    //                             ;

                    //                      if(obj.hotels[i][1].hotelDetailInfo.lastCheckinTime){
                    //                         content+=   
                    //                                     Number(obj.hotels[i][1].hotelDetailInfo.lastCheckinTime.split(":")[0]);
                    //                      }
                    //                      else{
                    //                         content+=   
                    //                                     Number(obj.hotels[i][1].hotelDetailInfo.checkoutTime.split(":")[0])+24;
                    //                      }
                    //                      content+=
                    //                             "' value='"+
                    //                             Number(obj.hotels[i][1].hotelDetailInfo.checkinTime.split(":")[0]) +
                    //                             "'  style ='width: 40px'>時 <b>チェックアウト:</b>" +
                    //                             "<input type ='number' id='checkout"+
                    //                             i + 
                    //                             "a"+
                    //                             j+
                    //                             "' min='0' max='"+
                    //                             Number(obj.hotels[i][1].hotelDetailInfo.checkoutTime.split(":")[0])+
                    //                             "' value='"+
                    //                             Number(obj.hotels[i][1].hotelDetailInfo.checkoutTime.split(":")[0]) +
                    //                             "'  style ='width: 40px'>時"+
                                                
                    //                             "<input type='button' value ='予約' " +
                    //                             "onclick = 'addHotelMarker("+
                    //                             "&quot;" + obj.hotels[i][0].hotelBasicInfo.hotelName+ 
                    //                             "&quot; ,&quot; "+
                    //                             obj.hotels[i][0].hotelBasicInfo.latitude +"&quot; ,&quot; "+
                    //                             obj.hotels[i][0].hotelBasicInfo.longitude+"&quot; ,&quot;"+
                    //                             i +
                    //                             "&quot;, &quot;" +
                    //                             j +
                    //                             "&quot; ,&quot; " +
                    //                             obj.hotels[i][j].roomInfo[0].roomBasicInfo.reserveUrl +
                    //                             "&quot; ,&quot; " +
                    //                             hotel_cost+ 
                    //                             "&quot; )'>" +
                    //                             "</form>"+
                    //                             "</div>"
                    //                             ;


                    //                 }

                    //                 content += "</div>";
                    //                 element.innerHTML = content;

                    //                 var objBody = document.getElementById('hotel_plans'); 
                    //                 objBody.appendChild(element);
                    //             }
                    //             $(document).ready(function(){
                    //                 $('.slider').bxSlider({
                    //                 prevText: '<',
                    //                 nextText: '>'
                    //                 });
                    //             });
                    //         }
                    // );
                }
                else{
                    alert("位置情報取得できませんでした.正しい住所を入力してください");
                    
                }
            }
        );
    }   
}