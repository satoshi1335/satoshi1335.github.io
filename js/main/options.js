//Create Modal Window
$(function() {
    $( 'a[rel*=leanModal]').leanModal({
            top: $(window).height()/2 - 350,                     // モーダルウィンドウの縦位置を指定
            overlay : 0.5,                                        // 背面の透明度 
    });
}); 

//Edit Departure Place
function changeDeparturePlace() {
    var num =[];
    if(geocoder){
        geocoder.geocode(
            { 'address': document.route_option.departure_point.value ,'region': 'jp', 'language': 'ja'},
            function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    start_marker.setMap(null);
                    var latlng = results[0].geometry.location;
                    start_marker = new google.maps.Marker({
                        position: latlng,
                        map: map
                    });
                    var start_infowindow = new google.maps.InfoWindow({
                        content:
                            document.route_option.departure_time.value +
                            "時 " +
                            document.route_option.departure_point_name.value +
                            "出発",
                    });
                    google.maps.event.addListener(start_marker, 'mouseover', function() {
                        start_infowindow.open(map,start_marker);
                    });
                    google.maps.event.addListener(start_marker, 'mouseout', function() {
                        start_infowindow.close(map,start_marker);
                    });
                    displayRoute();
                }
                else{
                    alert("出発地が取得できませんでした．出発地の住所を正しく入力してください");
                }
            }
        );
    }
    for(var i=0;i<24;i++){
        var time = Number(i+1)+"clock";
        document.getElementById(time).style.color = 'black';
    }
    var start_time = document.route_option.departure_time.value+"clock";
    document.getElementById(start_time).style.color = 'red';
}

//Edit End Place
function changeEndPlace() {
    var num =[];
    if (geocoder) {
        geocoder.geocode(
            {'address': document.route_option.end_point.value ,'region': 'jp', 'language': 'ja'},
            function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    markersArray[0].setMap(null);
                    var latlng = results[0].geometry.location;
                    markersArray[0] = new google.maps.Marker({
                        position: latlng,
                        map: map
                    });
                    markersArray[0].infowindow = new google.maps.InfoWindow({
                        content: document.route_option.plan_name.value +"終了",
                    });
                    google.maps.event.addListener(markersArray[0], 'mouseover', function() {
                            markersArray[0].open(map,markersArray[0]);
                    });
                    google.maps.event.addListener(markersArray[0], 'mouseout', function() {
                            markersArray[0].infowindow.close(map,markersArray[0]);
                    });
                    displayRoute();
                }
                else{
                    alert("到着地が取得できませんでした．到着地の住所を正しく入力してください");
                }
            }
        );
    }
}

// Edit Title
function editTitle(){
    document.getElementById('title').innerHTML = document.route_option.plan_name.value;
    document.getElementById('1000000').innerHTML = document.route_option.plan_name.value +"終了";
    markersArray[0].infowindow = new google.maps.InfoWindow({
        content: document.route_option.plan_name.value +"終了",
    });
}