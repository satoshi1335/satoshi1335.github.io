/*Add*/
//add marker created manually
function addMarker() {
    var address = document.plan.E.value;
    if (geocoder) {
        geocoder.geocode(
            { 'address': address,'region': 'jp', 'language': 'ja'},
            function (results, status) {
                if(status == google.maps.GeocoderStatus.OK){
                    var latlng = results[0].geometry.location;
                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map
                    });
                    marker.infowindow = new google.maps.InfoWindow({
                            content:document.plan.B.value
                    });
                    google.maps.event.addListener(marker, 'mouseover', function() {
                        marker.infowindow.open(map,marker);
                    });
                    google.maps.event.addListener(marker, 'mouseout', function() {
                        marker.infowindow.close(map,marker);
                    });
                    map.panTo(latlng);
                    markersArray[l-1000000]=marker;
                    addSchedule();
                }
                else{
                    alert("位置情報取得できませんでした.正しい住所を入力してください");
                }
            }
        );
    }
}

//add fixed schedule's marker
function addMarkerOfReservedSchedule() {
    var start_date = document.reserved_plan.start_date.value;
    var end_date = document.reserved_plan.end_date.value;
    var start_time = document.reserved_plan.start.value;
    var end_time = document.reserved_plan.end.value;
    var added_place_id = number_of_days*Number(start_time)+ Number(start_date)-1;
    var added_place = document.getElementById(added_place_id);
    var span = 24*(Number(end_date)-Number(start_date))+Number(end_time)- Number(start_time);
    var address = document.reserved_plan.address.value;
    var m = 0;
    for(var i=0; i<span; i++){
        var area = index_of_schedule[Math.floor(Number(added_place_id)/number_of_days)+(Number(added_place_id)%number_of_days)*24+i];
        var confirm = document.getElementById(area);
        if(confirm.firstChild === null){
            m=m;
        }
        else{
            m++;
        }
    }
    if (geocoder) {
        geocoder.geocode(
            { 'address': address,'region': 'jp', 'language': 'ja'},
            function (results, status) {
                if (status === google.maps.GeocoderStatus.OK && m ===0) {
                    var latlng = results[0].geometry.location;
                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        icon:   'http://www.c.csce.kyushu-u.ac.jp/~satoshi.isobe/travel/image/green_marker.png',
                    });
                    marker.infowindow = new google.maps.InfoWindow({
                        content:
                        start_time + "時〜" +
                        end_time + "時 " +
                        "<br>"+
                        document.reserved_plan.name.value,
                    });
                    google.maps.event.addListener(marker, 'mouseover', function() {
                        marker.infowindow.open(map,marker);
                    });
                    google.maps.event.addListener(marker, 'mouseout', function() {
                        marker.infowindow.close(map,marker);
                    });
                    markersArray[l-1000000]=marker;
                    map.panTo(latlng);
                    addReservedSchedule();
                }
                else{
                    alert("入力した住所，または予定が重なっていないか確認してください ");
                }
            }
        );
    }
}

//add public transportation's marker
function addMarkerOfTransfer() {
    var marker1;
    var marker2;
    var latlng1;
    var latlng2;
    var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 0.6,
        scale: 4
    };
    var polyOptions= {
        strokeColor : "#FF0000",
        strokeOpacity: 0,
        strokeWright : 3 ,
        icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat:'20px'
        }],
        geodesic : true
    };
    var poly = new google.maps.Polyline(polyOptions);
    var path = poly.getPath();
    var departure_place = document.reserved_transfer.departure_place.value;
    var departure_date = document.reserved_transfer.departure_date.value;
    var departure_time = document.reserved_transfer.departure_time.value;
    var arrival_place = document.reserved_transfer.arrival_place.value;
    var arrival_date = document.reserved_transfer.arrival_date.value;
    var arrival_time = document.reserved_transfer.arrival_time.value;
    var added_place_id = number_of_days*Number(departure_time)+ Number(departure_date)-1;
    var added_place = document.getElementById(added_place_id);
    var span = 24*(Number(arrival_date)-Number(departure_date))+Number(arrival_time)- Number(departure_time);
    var title = document.reserved_transfer.name.value;
    var m = 0;
    for(var i=0; i<span; i++){
        var area = index_of_schedule[Math.floor(Number(added_place_id)/number_of_days)+(Number(added_place_id)%number_of_days)*24+i];
        var confirm = document.getElementById(area);
        if(confirm.firstChild === null){
            m=m;
        }
        else{
            m++;
        }
    }
    if(geocoder){
        geocoder.geocode(
            { 'address': departure_place,'region': 'jp', 'language': 'ja'},
            function (results, status) {
                if (status == google.maps.GeocoderStatus.OK && m===0) {
                    latlng1 = results[0].geometry.location;
                    marker1 = new google.maps.Marker({
                        position: latlng1,
                        map: map,
                        icon:'./image/green_marker.png',
                    });
                    marker1.infowindow = new google.maps.InfoWindow({
                        content:
                            title + "<br>" +
                            departure_time + "時 " +
                            departure_place + "発",
                    });
                    google.maps.event.addListener(marker1, 'mouseover', function() {
                        marker1.infowindow.open(map,marker1);
                    });
                    google.maps.event.addListener(marker1, 'mouseout', function() {
                        marker1.infowindow.close(map,marker1);
                    });
                    markersArray[l-1000000]=marker1;
                    path.push(latlng1);
                    geocoder.geocode(
                        { 'address': arrival_place,'region': 'jp', 'language': 'ja'},
                        function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK && m===0) {
                                latlng2 = results[0].geometry.location;
                                marker2 = new google.maps.Marker({
                                    position: latlng2,
                                    map: map,
                                    icon:   './image/green_marker.png',
                                });
                                marker2.infowindow = new google.maps.InfoWindow({
                                    content:title + "<br>" +
                                        arrival_time + "時 " +
                                        arrival_place + "着",
                                });
                                google.maps.event.addListener(marker2, 'mouseover', function() {
                                    marker2.infowindow.open(map,marker2);
                                });
                                google.maps.event.addListener(marker2, 'mouseout', function() {
                                    marker2.infowindow.close(map,marker2);
                                });
                                markersArray[l-999999]= marker2;
                                path.push(latlng2);
                                polyArray[Number(l)-1000000] = poly;
                                poly.setMap(map);
                                addReservedTransfer();
                            }
                            else{
                                alert("到着地の位置情報が取得できません．正しい住所を入力してください");
                                markersArray[Number(l)-1000000].setMap(null);
                            }
                        }
                    );
                }
                else{
                    alert("出発地の住所と既に予定が入っていないか確認してください");
                }
            }
        );
    }   
}

//add recommended marker
function addRecommendedMarker(place){
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        animation: google.maps.Animation.DROP,
    });
    var content = "<img width='16' height='16'src='"+
                place.icon+
                "'/>"　+
                "<b>"+
                place.name +
                "<b>";

    if(place.photos && place.photos.length>0){
        content += "<br>" + "<img src='"+
                place.photos[0].getUrl({'maxWidth':200,'maxHeight':200})+
                "'/>";
    }
    var days = ["日","月","火","水","木","金","土"];
    var price_level = ["0","1000","3000","10000","30000"];
    if(place.opening_hours){
        content += "<br>営業時間";
        for(var i=0; i<number_of_days; i++){
            var myD = new Date(Number(day_info[0]),Number(day_info[1])-1,Number(day_info[2])+i);
            content += "<br>" + Number(myD.getMonth()+1)+ "/" + myD.getDate() +"(" +days[myD.getDay()]+ ") ：";
            if(place.opening_hours.periods[myD.getDay()]){
                content +=  place.opening_hours.periods[myD.getDay()].open.hours + ":";
           　    if (place.opening_hours.periods[myD.getDay()].open.minutes === 0){
                    content +=  "0" + place.opening_hours.periods[myD.getDay()].open.minutes + "〜";
                }
                else {
                    content +=place.opening_hours.periods[myD.getDay()].open.minutes + "〜";
                }
                if(place.opening_hours.periods[myD.getDay()].close){
                    content +=place.opening_hours.periods[myD.getDay()].close.hours + ":";
                    if (place.opening_hours.periods[myD.getDay()].close.minutes === 0){
                        content +=  "0" + place.opening_hours.periods[myD.getDay()].close.minutes;
                    }
                    else {
                        content +=place.opening_hours.periods[myD.getDay()].close.minutes;
                    }
                }
            }
            else{
                content += "定休日";
            }
        }
    }
    if(place.price_level){
        content += "<br>" +price_level[place.price_level-1]+"円" + "〜"+ price_level[place.price_level] + "円";
    }
 

    marker.infowindow = new google.maps.InfoWindow({
            content: content,
    });
    google.maps.event.addListener(marker, 'mouseover', function() {
        marker.infowindow.open(map, this);
    });
    google.maps.event.addListener(marker, 'mouseout', function() {
        marker.infowindow.close(map,marker);
    });
    if(place.website != null){
        google.maps.event.addListener(marker, 'click', function() {
            window.open(place.website);
        });
    }
    markersArray[l-1000000] = marker;
    addRecommendedSchedule(place);
}

//add hotel's marker
function addHotelMarker(title,lat,lng,a,b,URL,cost) {
        var checkin = "checkin" + a +"a"+ b; 
        var checkout = "checkout" + a + "a" + b;
        var start = document.getElementById(checkin).value;
        var end_time = document.getElementById(checkout).value;
        var end_date = Number(document.about_hotel.stay_date.value)+1;
        if(Number(start)>23){
            var start_time =  Number(start)-24;
            var start_date = Number(document.about_hotel.stay_date.value) +1;
        }
        else{
            var start_time = Number(start);
            var start_date = Number(document.about_hotel.stay_date.value);
        }
        var added_place_id = number_of_days*Number(start_time)+ Number(start_date)-1;
        var added_place = document.getElementById(added_place_id);
        var span = 24*(Number(end_date)-Number(start_date))+Number(end_time)- Number(start_time);
        var m = 0;
        for(var i=0; i<span; i++){
            var area = index_of_schedule[Math.floor(Number(added_place_id)/number_of_days)+(Number(added_place_id)%number_of_days)*24+i];
            var confirm = document.getElementById(area);
            if(confirm.firstChild === null){
                m=m;
            }
            else{
                m++;
            }
        }
        setTimeout(function(){ intervalEvent(m,lat,lng,title,start_time,end_time,start_date,end_date,cost,URL); },300);
}

function intervalEvent(m,lat,lng,title,start_time,end_time,start_date,end_date,cost,URL){
        if (m ===0) {
            var latlng = new google.maps.LatLng(lat,lng);
            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                icon:'./image/green_marker.png',
            });
            marker.infowindow = new google.maps.InfoWindow({
                content:    title + '<br>' +
                            start_time + '時チェックイン' + '<br>'+
                            end_time + '時チェックアウト',
            });
            google.maps.event.addListener(marker, 'mouseover', function() {
                marker.infowindow.open(map,marker);
            });
            google.maps.event.addListener(marker, 'mouseout', function() {
                marker.infowindow.close(map,marker);
            });
            google.maps.event.addListener(marker, 'click', function() {
                window.open(URL,null);
            });
            markersArray[l-1000000]=marker;
            map.panTo(latlng);
            addHotelSchedule(title,start_date,end_date,start_time,end_time,cost);
            window.open(URL,null);
        }
        else{
            alert('予定が重なっています.スケジュールを調節して予約してください ');
        }
}

//add start marker
function addStartMarker(){   
     if (geocoder) {
            geocoder.geocode(
                { 'address': departure_address,'region': 'jp', 'language': 'ja'},
                function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var latlng = results[0].geometry.location;
                        start_marker = new google.maps.Marker({
                            position: latlng,
                            map: map
                        });
                        start_marker.infowindow = new google.maps.InfoWindow({
                            content:
                            document.route_option.departure_time.value +
                            "時 " +
                            departure_place +
                            "出発",
                        });
                        google.maps.event.addListener(start_marker, 'mouseover', function() {
                                start_marker.infowindow.open(map,start_marker);
                        });
                        google.maps.event.addListener(start_marker, 'mouseout', function() {
                                start_marker.infowindow.close(map,start_marker);
                        });
                        map.panTo(latlng);
                        displayRoute();
                    }
                    else{
                        alert("出発地が取得できませんでした．出発地の住所を正しく入力してください");
                        $("a[rel='leanModal']").click();

                    }

                }
            );
        }

}

//add markers of destinations decided in input page
function addInitialMarkers(i){
    if(i<3){
        if(initialized_address[i]){
            var added_place_id;
            while( m!==0){
                added_place_id = Math.round(Math.random()*10000*(i+1))%(11*number_of_days) + 7*number_of_days;
                var m = 0;
                for(var j=0; j<Number(initialized_span[i]); j++){
                    var area = index_of_schedule[Math.floor(Number(added_place_id)/number_of_days)+(Number(added_place_id)%number_of_days)*24+j];
                    var confirm = document.getElementById(area);
                    if(Number(confirm.id) < number_of_days){
                        m++;
                    }
                    else if(confirm.firstChild === null){
                        m=m;
                    }
                    else{
                        m++;
                    }
                }
            }
            var added_place = document.getElementById(added_place_id);
            var address = initialized_address[i];
            if (geocoder) {
                geocoder.geocode(
                    { 'address': address,'region': 'jp', 'language': 'ja'},
                    function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            var latlng = results[0].geometry.location;
                            var marker = new google.maps.Marker({
                                position: latlng,
                                map: map,
                                icon:'./image/green_marker.png',
                            });
                            marker.infowindow = new google.maps.InfoWindow({
                                    content:initialized_place[i],
                            });
                            google.maps.event.addListener(marker, 'mouseover', function() {
                                marker.infowindow.open(map,marker);
                            });
                            google.maps.event.addListener(marker, 'mouseout', function() {
                                marker.infowindow.close(map,marker);
                            });
                            markersArray[l-1000000]=marker;
                            var element = document.createElement('div');
                            element.id = l;
                            element.title = initialized_place[i];       
                            element.className = 'd';
                            innerHTMLonSchedule(element,added_place,initialized_place[i],initialized_span[i],initialized_cost[i],initialized_address[i]);
                            element.style.height =44*Number(initialized_span[i]) +"px";
                            element.draggable = true;
                            if(element.addEventListener){
                                element.addEventListener("dragstart",f_dragstart);
                            }
                            else if(element.attachEvent){
                                element.attachEvent("ondragstart",f_dragstart);
                            }
                            else{
                                element.ondragstart = f_dragstart;
                            }
                            var objBody = document.getElementById(added_place_id); 
                            objBody.appendChild(element);
                            added_place.rowSpan= initialized_span[i];
                            for(var j=1; j<initialized_span[i]; j++){
                                var rmtd_id = Number(added_place_id)+number_of_days*j;
                                var rmtd = document.getElementById(rmtd_id);
                                rmtd.style.display="none";
                            }
                            l++;
                        }
                        else{
                            alert("位置情報取得できませんでした.正しい住所を入力してください");
                        }
                    }
                );
            }
        }
        addInitialMarkers(i+1);
    }
    else{
        addStartMarker();
        addEndMarker();
        Recommend();
    }
}

//add end place's marker
function addEndMarker() {
    var address = end_address;
    if (geocoder) {
        geocoder.geocode(
            { 'address': address,'region': 'jp', 'language': 'ja'},
            function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var latlng = results[0].geometry.location;
                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map
                    });
                    marker.infowindow = new google.maps.InfoWindow({
                            content:plan_name + "終了",
                    });
                    google.maps.event.addListener(marker, 'mouseover', function() {
                            marker.infowindow.open(map,marker);
                    });
                    google.maps.event.addListener(marker, 'mouseout', function() {
                            marker.infowindow.close(map,marker);
                    });
                    markersArray[0]=marker;
                    addEndSchedule();
                }
                else{
                        alert("位置情報取得できませんでした.正しい住所を入力してください");
                }
            }
        );
    }
}


/*Edit*/
//edit marker
function editMarker(element){
    var parent = element.parentNode;
    var pre_address = parent.firstChild.nextSibling.title;
    var updateE = parent.id + "E";
    var updateB = parent.id + "B";
    var updateD = parent.id + "D";
    var name  = document.getElementById(updateB).value;
    var cost  = document.getElementById(updateD).value;
    var address = document.getElementById(updateE).value;
    if (geocoder && pre_address != address) {
        geocoder.geocode(
            { 'address': address,'region': 'jp', 'language': 'ja'},
            function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var latlng = results[0].geometry.location;
                    markersArray[Number(parent.id) - 1000000].setMap(null);
                    if(document.getElementById(Number(parent.id)).className =='d'){
                        markersArray[Number(parent.id) - 1000000] = new google.maps.Marker({
                            position: latlng,
                            map:map,
                            icon:'./image/green_marker.png',
                        });
                    }
                    else{
                        markersArray[Number(parent.id) - 1000000] = new google.maps.Marker({
                            position: latlng,
                            map:map
                        });
                    }
                    markersArray[Number(parent.id)-1000000].infowindow = new google.maps.InfoWindow({
                            content:name,
                    });
                    google.maps.event.addListener(markersArray[Number(parent.id)-1000000], 'mouseover', function() {
                        markersArray[Number(parent.id)-1000000].infowindow.open(map,markersArray[Number(parent.id)-1000000]);
                    });
                    google.maps.event.addListener(markersArray[Number(parent.id)-1000000], 'mouseout', function() {
                        markersArray[Number(parent.id)-1000000].infowindow.close(map,markersArray[Number(parent.id)-1000000]);
                    });
                    if(parent.parentNode.id == 'pallet' || parent.parentNode.id == 'recommend'){
                        saveSchedule(element);
                    }
                    else{
                        saveSchedule(element);
                        displayRoute(); 
                    }
                }
                else{
                    alert("位置情報を取得できません．正しい住所を入力してください");
                }
            }
        );
    }
    else{
        saveSchedule(element);
    }
}



/*Delete*/
function deleteMarkerOnPallet(element){
    var marker = markersArray[Number(element.id) - 1000000];
    marker.setMap(null);
}   
    
function deleteMarkerOnSchedule(element){
    var marker = markersArray[Number(element.id) - 1000000];
    marker.setMap(null);
    displayRoute();
}  

//delete public transportation's marker
function deleteMarkerOfTransfer(element){
    var poly = polyArray[Number(element.id) - 1000000];
    poly.setMap(null);
    var marker = markersArray[Number(element.id) - 1000000];
    marker.setMap(null);
    marker = markersArray[Number(element.id) - 999999];
    marker.setMap(null);
    displayRoute();
}

//Delete all cards on recommend pallet
function clearRecommendedMarker(){
    var recommend_pallet = document.getElementById('recommend');
    for (var i =recommend_pallet.childNodes.length-1; i>4; i--) {
        deleteMarkerOnPallet(recommend_pallet.childNodes[i]);
        recommend_pallet.removeChild(recommend_pallet.childNodes[i]);
    }
}