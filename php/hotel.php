<?php
    $Data1 = $_GET['lat'];
    $Data2 = $_GET['lng'];
    $Data3 = $_GET['checkinDate'];
    $Data4 = $_GET['checkoutDate'];
    $Data5 = $_GET['adultNum'];
    $Data6 = $_GET['maxCharge'];

    $Data1=htmlspecialchars($Data1);
    $Data2=htmlspecialchars($Data2);
    $Data3=htmlspecialchars($Data3);
    $Data4=htmlspecialchars($Data4);
    $Data5=htmlspecialchars($Data5);
    $Data6=htmlspecialchars($Data6);

    // please enter your own rakuten api's key
    $id = ""

    $url = "https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20131024?applicationId=";
    $url .= $id;
    $url .= "&affiliateId=1343421e.5a827f88.1343421f.8b25f39e&formatVersion=2&datumType=1&responseType=middle";
    $url .= "&elements=pagingInfo,hotelName,hotelInformationUrl,address1,latitude,longitude,parkingInformation,hotelThumbnailUrl,reviewAverage,checkinTime,lastCheckinTime,checkoutTime,planName,reserveUrl,total,chargeFlag,reviewAverage,withDinnerFlag,withBreakfastFlag";
    $url .= "&latitude=".$Data1;
    $url .= "&longitude=".$Data2;
    $url .= "&searchRadius=3.0";
    $url .= "&checkinDate=".$Data3;
    $url .= "&checkoutDate=".$Data4;
    $url .= "&adultNum=".$Data5;
    $url .= "&maxCharge=".$Data6;

    $json = file_get_contents($url);    //content of file -> text
    echo $json;
?>