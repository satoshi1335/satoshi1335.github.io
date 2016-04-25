var geocoder= new google.maps.Geocoder();   //Object for geocoding

var departure_map;                          //Departure Map
var end_map;                                //End Map
var destination_map;                        //Destination Map

var departure_marker;                       //Departure Marker
var end_marker;                             //End Marker
var marker1;                                //Destination Marker 1
var marker2;                                //Destination Marker 2
var marker3;                                //Destination Marker 3

var departure_infowindow;                   //Departure Marker's Infowindow
var end_infowindow;                         //End Marker's Infowindow
var infowindow1;                            //Destination Infowindow 1
var infowindow2;                            //Destination Infowindow 2
var infowindow3;                            //Destination Infowindow 3

//Initialize Maps
function initialize() {
    var myLatlng = new google.maps.LatLng(35.681382,139.766084);
    var map_options = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: myLatlng
    };
    var destination_map_options = {
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: myLatlng
    };

    navigator.geolocation.getCurrentPosition(function(position) {
        myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        departure_map.setCenter(myLatlng);
        end_map.setCenter(myLatlng);
        destination_map.setCenter(myLatlng);

        var departure_marker_options ={
          position: myLatlng,
          map: departure_map,
          draggable:true,
        };
        var end_marker_options ={
          position: myLatlng,
          map: end_map,
          draggable:true,
        };
        departure_marker = new google.maps.Marker(departure_marker_options);
        end_marker = new google.maps.Marker(end_marker_options);

        geocoder.geocode({'latLng': myLatlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    document.input_form.departure_place.value = results[1].formatted_address.substring(4);
                    document.input_form.end_place.value = results[1].formatted_address.substring(4);
                    var infowindowOptions = {
                        content: "出発場所を検索し，その場所までマーカーを動かしてください"
                    }
                    departure_infowindow = new google.maps.InfoWindow(infowindowOptions);
                    departure_infowindow.open(departure_map,departure_marker);
                    var infowindowOptions3 = {
                        content: "解散場所を検索し，解散する場所までマーカーを動かしてください",
                    }
                    end_infowindow = new google.maps.InfoWindow( infowindowOptions3 );
                    end_infowindow.open( end_map,end_marker);
                }
            }
            else{
                alert(住所を取得できません);
            }
        });

        google.maps.event.addListener(departure_marker, 'dragend', departure_mylistener);
        google.maps.event.addListener(end_marker, 'dragend', end_mylistener);
    });

    departure_map = new google.maps.Map(document.getElementById("departure_map_canvas"),map_options);
    end_map = new google.maps.Map(document.getElementById("end_map_canvas"),map_options);
    destination_map = new google.maps.Map(document.getElementById("destination_map_canvas"),destination_map_options);
}

//Get Address from Place Name
function geocode(type){
    if(type === "start"){
        if(departure_marker){
            departure_marker.setMap(null);
        }
        var map = departure_map;
        var address = document.input_form.departure_place.value;
    }
    else if(type === "end"){
        if(end_marker){
            end_marker.setMap(null);
        }
        var map = end_map;
        var address = document.input_form.end_place.value;
    }
    else if(type === 1){
        if(marker1){
            marker1.setMap(null);
        }
        var map = destination_map;
        var address = document.input_form.destination1.value;
    }
    else if(type === 2){
        if(marker2){
            marker2.setMap(null);
        }
        var map = destination_map;
        var address = document.input_form.destination2.value;
    }
    else{
        if(marker3){
            marker3.setMap(null);
        }
        var map = destination_map;
        var address = document.input_form.destination3.value;
    }

    if (geocoder) {
        //send request to geocoder
        geocoder.geocode(
            //data which is sent to geocoder
            { 'address': address,'region': 'jp', 'language': 'ja'},
            //function which is called when result is sent back
            function (results, status) {
                //If geocoding is suceeded
                if (status == google.maps.GeocoderStatus.OK) {
                    //get the location of geometory of result[0]
                    var latlng = results[0].geometry.location;
                    if(type === 'start'){
                        document.input_form.departure_address.value=address;
                        departure_marker = new google.maps.Marker({
                            position: latlng,
                            map: map,
                            draggable:true
                        });
                        departure_infowindow = new google.maps.InfoWindow({
                            content: address,
                        });
                        departure_infowindow.open(map,departure_marker);
                        google.maps.event.addListener(departure_marker, 'dragend', departure_mylistener);
                    }
                    else if(type === 'end'){
                        document.input_form.end_address.value= address;
                        end_marker = new google.maps.Marker({
                            position: latlng,
                            map: map,
                            draggable:true
                        });
                        end_infowindow = new google.maps.InfoWindow({
                            content: address,
                        });
                        end_infowindow.open(map,end_marker);
                        google.maps.event.addListener(end_marker, 'dragend', end_mylistener);                       
                    }
                    else if(type == 1){
                        document.input_form.destination_address1.value=address;
                        marker1 = new google.maps.Marker({
                            position: latlng,
                            map: map,
                            draggable:true
                        });
                        infowindow1 = new google.maps.InfoWindow({
                            content: address,
                        });
                        infowindow1.open(map,marker1);
                        google.maps.event.addListener(marker1, 'dragend', mylistener1);                       
                    }
                    else if(type == 2){
                        document.input_form.destination_address2.value=address;
                        marker2 = new google.maps.Marker({
                            position: latlng,
                            map: map,
                            draggable:true
                        });
                        infowindow2 = new google.maps.InfoWindow({
                            content: address,
                        });
                        infowindow2.open(map,marker2);
                        google.maps.event.addListener(marker2, 'dragend', mylistener2);                       
                    }
                    else{
                        document.input_form.destination_address3.value=address;
                        marker3 = new google.maps.Marker({
                            position: latlng,
                            map: map,
                            draggable:true
                        });
                        infowindow3 = new google.maps.InfoWindow({
                            content: address,
                        });
                        infowindow3.open(map,marker3);
                        google.maps.event.addListener(marker3, 'dragend', mylistener3);                       
                    }
                    map.panTo(latlng);
                }
                else{
                    alert("行きたいところの住所入力してください");
                }
            }
        );
    }
}


//Get Address form Marker's Position
function departure_mylistener(event) {
    var latlng = event.latLng;
    if(departure_infowindow){
        departure_infowindow.setMap(null);
    }
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK){
            if(results[1]) {
                document.input_form.departure_address.value = results[1].formatted_address.substring(4);
                var infowindowOptions = {
                    content: results[1].formatted_address.substring(4),
                }
                departure_infowindow = new google.maps.InfoWindow( infowindowOptions );
                departure_infowindow.open( departure_map,departure_marker);
            }
        }
        else{
            alert(住所を取得できません);
        }
    });
}

function end_mylistener(event) {
    var latlng = event.latLng;
    if(end_infowindow){
        end_infowindow.setMap(null);
    }
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK){
            if (results[1]) {
                document.input_form.end_address.value = results[1].formatted_address.substring(4);
                var infowindowOptions3 = {
                    content: results[1].formatted_address.substring(4),
                }
                end_infowindow = new google.maps.InfoWindow( infowindowOptions3 );
                end_infowindow.open( end_map,end_marker);
            }
        }
        else{
            alert(住所を取得できません);
        }
    });
}

function mylistener1(event) {
    var latlng = event.latLng;
    if(infowindow1){
        infowindow1.setMap(null);
    }
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK){
            if (results[1]) {
                document.input_form.destination_address1.value = results[1].formatted_address.substring(4);
                var infowindowOptions = {
                    content: "1. " +results[1].formatted_address.substring(4) + "",
                }
                infowindow1 = new google.maps.InfoWindow( infowindowOptions );
                infowindow1.open( destination_map,marker1);
            }
        }
        else{
            alert(住所を取得できません);
        }
    });
}

function mylistener2(event) {
    var latlng = event.latLng;
    if(infowindow2){
        infowindow2.setMap(null);
    }
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK){
            if (results[1]) {
                document.input_form.destination_address2.value = results[1].formatted_address.substring(4);
                var infowindowOptions = {
                    content: "2. " +results[1].formatted_address.substring(4) + "",
                }
                infowindow2 = new google.maps.InfoWindow( infowindowOptions );
                infowindow2.open(destination_map,marker2);
            }
        }
        else{
            alert(住所を取得できません);
        }
    });
}

function mylistener3(event) {
    var latlng = event.latLng;
    if(infowindow3){
        infowindow3.setMap(null);
    }
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                document.input_form.destination_address3.value = results[1].formatted_address.substring(4);
                var infowindowOptions = {
                    content: "3. " +results[1].formatted_address.substring(4) +"",
                }
                infowindow3 = new google.maps.InfoWindow( infowindowOptions );
                infowindow3.open( destination_map,marker3);
            }
        }
        else{
            alert(住所を取得できません);
        }
    });
}