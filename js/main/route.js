//課題
//一カ所の変更で全てのルートを表示し直している -> 変更の前後のルートだけを書き換える様に変更


//Global Variable
var total_distance=0;   //total distance
var cnt;
var tmp = 0;
//Initialize map and Display Routes
function displayRoute(){
    var start;
    var end;
    var gas_price = document.gas.gas_price.value;
    var efficiency= document.gas.efficiency.value;
    var routeNum = tmp;
    /*initialize*/
    for(i=0; i<routeNum; i++){
        route_infowindow[i].close(map);
    }
    total_distance =0;
    routeNum=0;
    cnt = 0;
    departureIC.length =0;
    arrivalIC.length = 0;
    route_infowindow.length = 0;
    // restitute the discription of total distance and gas cost
    document.getElementById("total_distance").innerHTML ="総走行距離 0km";
    document.getElementById("gas_cost").innerHTML="ガソリン代 0円";
    // get the ids of shedule & restitute background color
    for (var i=0; i<number_of_days*24; i++){
        document.getElementById(i).style.backgroundColor = 'rgba(250,255,245,0.1)';
    }
    // restitute the array for Route
    routesArray.forEach(deleteRoute);
    

    /*for Each Route*/
    start = start_marker.position;
    for (var i=0; i<number_of_days*24; i++){
        var parent = document.getElementById(index_of_schedule[i]);
        if(parent.firstChild !== null){
            if(parent.firstChild.title === "高速バス" || parent.firstChild.title === "飛行機" || parent.firstChild.title === "フェリー" || parent.firstChild.title === "列車"){
                routeNum++;
            }
            else if(parent.firstChild.title === "--続き--"){}
            // else
            else{
                routeNum++;
            }
        }
    }
    // excute calcRoute Function
    var route_index = 0;
    for (var i=0; i<number_of_days*24; i++){
        var parent = document.getElementById(index_of_schedule[i]);
        if(parent.firstChild !== null){
            // if schedule card is over two consecutive days
            if(parent.firstChild.title === "高速バス" || parent.firstChild.title === "飛行機" || parent.firstChild.title === "フェリー" || parent.firstChild.title === "列車"){
                end = markersArray[parent.firstChild.id -1000000].position;
                calcRoute(start,end,parent.firstChild.id -1000000,gas_price,efficiency,parent,routeNum,route_index);
                start = markersArray[parent.firstChild.id -999999].position;
                route_index++;
            }
            else if(parent.firstChild.title === "--続き--"){}
            // else
            else{
                end = markersArray[parent.firstChild.id -1000000].position;
                calcRoute(start,end,parent.firstChild.id -1000000,gas_price,efficiency,parent,routeNum,route_index);
                start = markersArray[parent.firstChild.id -1000000].position;
                route_index++;
            }
        }
    }
    if(route_index == 0){
        displayHighwayIC(routeNum);
    }
    tmp = routeNum;
}

//Delete Route
function deleteRoute(value, index, ar){
    value.setMap(null);
}


//Display Route on the map & get and display duration time & create IC Arrays and prefecture Arrays of the Route
function calcRoute(start,end,k,gas_price,efficiency,end_element,routeNum,route_index) {
    var rendererOptions = {
        suppressMarkers: true
    }
    routesArray[route_index] = new google.maps.DirectionsRenderer(rendererOptions);
    routesArray[route_index].setMap(map);
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING,
        // if we use public transportation
        // travelMode: google.maps.TravelMode.TRANSIT,
        avoidHighways: document.route_option.Highway.checked,
        avoidTolls: document.route_option.Toll.checked,

        };
    var prefecture = /北海道|青森県|岩手県|宮城県|秋田県|山形県|福島県|茨城県|栃木県|群馬県|埼玉県|千葉県|東京都|神奈川県|新潟県|富山県|石川県|福井県|山梨県|長野県|岐阜県|静岡県|愛知県|三重県|滋賀県|京都府|大阪府|兵庫県|奈良県|和歌山県|鳥取県|島根県|岡山県|広島県|山口県|徳島県|香川県|愛媛県|高知県|福岡県|佐賀県|長崎県|熊本県|大分県|宮崎県|鹿児島県|沖縄県"/;
    directionsService.route(request, 
        function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                ICarray.length = 0;
                routesArray[route_index].setDirections(response);
                total_distance = total_distance + response.routes[0].legs[0].distance.value;
                // Display the duration and distance by infowindow
                var infowindowOptions = {
                    position:response.routes[0].legs[0].steps[Math.floor(response.routes[0].legs[0].steps.length/2)].start_location,
                    content:    "<img width='16' height='16'src='./image/car.png'/> <b> "　+
                                response.routes[0].legs[0].duration.text + "</b><br>" +
                                "<small align = right>" +
                                response.routes[0].legs[0].distance.text + "</small>"
                                ,
                }
                route_infowindow[route_index] = new google.maps.InfoWindow( infowindowOptions );
                route_infowindow[route_index].open( map );

                //Display total distance on the page
                var transit_time = response.routes[0].legs[0].duration.value;
                document.getElementById("total_distance").innerHTML ="総走行距離"+ total_distance/1000 + "km";       // <-　最後に1回やれば良い

                //create IC array of the routes
                response.routes[0].legs[0].steps.forEach(makeIcArray);
                
                departureIC[route_index]=ICarray[0];
                //extract prefecture form route
                if(response.routes[0].legs[0].start_address.match(prefecture)){
                    departurePrefecture[route_index]=response.routes[0].legs[0].start_address.match(prefecture)[0];
                }
                arrivalIC[route_index]=ICarray[ICarray.length - 1];
                if(response.routes[0].legs[0].end_address.match(prefecture)){
                    arrivalPrefecture[route_index]=response.routes[0].legs[0].end_address.match(prefecture)[0];
                }
                var length = Math.round(transit_time/3600);     // the number of the cell changed the color to display transit time
                for(var j=0; j<length; j++){    
                    if(Number(end_element.id)-number_of_days*(j+1) >= 0){
                        if(j===length-1){
                            document.getElementById(Number(end_element.id) - number_of_days*(j+1)).style.backgroundColor = 'rgba(250,55,55,0.3)';
                        }
                        else{
                            document.getElementById(Number(end_element.id) - number_of_days*(j+1)).style.backgroundColor = 'rgba(250,100,100,0.1)';
                        }
                    }
                    else if(Number(end_element.id)%number_of_days === 0){}
                    else{
                        if(j===length-1){
                            document.getElementById(number_of_days*24-1+(Number(end_element.id) - number_of_days*(j+1))).style.backgroundColor = 'rgba(250,55,55,0.3)';
                        }
                        else{
                            document.getElementById(number_of_days*24-1+(Number(end_element.id) - number_of_days*(j+1))).style.backgroundColor = 'rgba(250,100,100,0.1)';
                        }
                    }
                }
                cnt ++;
                if(cnt === routeNum){
                    displayHighwayIC(routeNum);
                }
            }
        }
    );
}



//Extract Fee Station Name from Route Information and create IC Array
function makeIcArray(value){
    // console.log(value.instructions.substring(3,15));
    if(value.instructions.substring(3,15).match(/料金所/) !== null){
        var end_point = value.instructions.search(/出口料金所/);
            if(end_point === -1){
                end_point = value.instructions.search(/料金所/);
        }
        ICarray.push(value.instructions.substring(3,end_point));
    }   
    else if(value.instructions.substring(3,15).match(/都市高(?!速)/) !== null){
        var start_point = value.instructions.search(/都市高/);
        var end_point = value.instructions.substring(3).search(/</);
        ICarray.push(value.instructions.substring(start_point+3,end_point+3));
    }
    else if(value.instructions.substring(3,15).match(/首都高(?!速)/) !== null){
        var start_point = value.instructions.search(/首都高/);
        var end_point = value.instructions.substring(3).search(/</);
        ICarray.push(value.instructions.substring(start_point+3,end_point+3));
    }
    else if(value.instructions.match(/ＩＣ(?!入口)|インター(?!通り)/) !== null){
        var end_point = value.instructions.search(/ＩＣ|インター/);
        var start_point = value.instructions.lastIndexOf("高速",end_point);
        if (start_point === -1){
            start_point = value.instructions.lastIndexOf("道路",end_point);
            if(start_point ===-1){
                start_point = value.instructions.lastIndexOf("b>",end_point);
            }
        }
        ICarray.push(value.instructions.substring(start_point+2,end_point));
    }   
    else if(value.instructions.substring(3,15).match(/ＪＣＴ/) !== null){
        var end_point = value.instructions.search(/ＪＣＴ/);
        ICarray.push(value.instructions.substring(3,end_point));
    }   
}