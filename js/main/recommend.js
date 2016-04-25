// create Recommended Card & Marker
function Recommend() {
    var address = document.recommend.place.value;
    if (geocoder) {
        geocoder.geocode(
            { 'address': address,'region': 'jp', 'language': 'ja'},
            function (results, status) {
                map.panTo(results[0].geometry.location);
                map.setZoom(12);
                if (status == google.maps.GeocoderStatus.OK) {
                    var type = document.recommend.type.value;
                    if(document.recommend.type.value == "buildings"){
                        var request = {
                            location: results[0].geometry.location,
                            radius: document.recommend.radius.value,
                            types: ['amusement_park','aquarium','art_gallery','museum','spa','zoo','park'],
                        };
                    }
                    else{
                        var request = {
                            location: results[0].geometry.location,
                            radius: document.recommend.radius.value,
                            types: ['restaurant'],
                        };
                    }
                    var recommend_pallet = document.getElementById('recommend');
                    for (var i =recommend_pallet.childNodes.length-1; i>4; i--) {
                        deleteMarkerOnPallet(recommend_pallet.childNodes[i]);
                        recommend_pallet.removeChild(recommend_pallet.childNodes[i]);
                    }
                    service.search(request,
                        function (results,status){
                            if (status === 'OK') {
                                for (var i = 0; i < 8; i++) {
                                    var request2 = {
                                        reference:results[i].reference, 
                                    };
                                    service.getDetails(request2,callback);
                                }
                            }
                        }
                    );
                }
                else{
                    alert("位置情報取得できませんでした.正しい住所を入力してください");
                    
                }
            }
        );
    }   
}

function callback(place,status){
    if(place != null){
        addRecommendedMarker(place);
    }
}