<?php
    $Data1 = $_GET['departureIC'];
    $Data2 = $_GET['arrivalIC'];
    $Data3 = $_GET['type'];
    $Data4 = $_GET['departurePrefecture'];
    $Data5 = $_GET['arrivalPrefecture'];

    $Data1=htmlspecialchars($Data1);
    $Data2=htmlspecialchars($Data2);
    $Data3=htmlspecialchars($Data3);
    $Data4=htmlspecialchars($Data4);
    $Data5=htmlspecialchars($Data5);

    // change Fee Station Name to IC Name
    // ----------------------------------


    // ----------------------------------

    // can rewrite by js

    $req = 'http://kosoku.jp/api/route.php';
    $req .="?f=".$Data1."&t=".$Data2."&c=".$Data3."&s=".$Data4;
    $xml = simplexml_load_file($req)
            or die('XMLパースエラー');

    if($xml->Status == 'NotEnd'){
        //if there are multiple Start IC
        if(count($xml->FromICs->IC)>1){
            for($i=0;$i<count($xml->FromICs->IC);$i++){
                for($j=0;$j<count($xml->StateICs->IC);$j++){
                    if((string)$xml->FromICs->IC[$i]==(string)$xml->StateICs->IC[$j]){
                        $Data1=urlencode($xml->FromICs->IC[$i]);
                    }
                }
            }
        }
        //if there are multiple End IC
        if(count($xml->ToICs->IC)>1 && $Data4 ==$Data5){
            for($i=0;$i<count($xml->ToICs->IC);$i++){
                for($j=0;$j<count($xml->StateICs->IC);$j++){
                    if((string)$xml->ToICs->IC[$i] == (string)$xml->StateICs->IC[$j]){
                        $Data2=urlencode($xml->ToICs->IC[$i]);
                    }
                }
            }

        }
        else if(count($xml->ToICs->IC)>1){
            $req = 'http://kosoku.jp/api/route.php';
            $req .="?f=".$Data1."&t=".$Data2."&c=".$Data3."&s=%E7%A6%8F%E5%B2%A1%E7%9C%8C";
            $xml = simplexml_load_file($req)
                    or die('XMLパースエラー');
            for($i=0;$i<count($xml->ToICs->IC);$i++){
                for($j=0;$j<count($xml->StateICs->IC);$j++){
                    if((string)$xml->ToICs->IC[$i]==(string)$xml->StateICs->IC[$j]){
                        $Data2=urlencode($xml->ToICs->IC[$i]);
                    }
                }
            }
        }

        $req = 'http://kosoku.jp/api/route.php';
        $req .="?f=".$Data1."&t=".$Data2."&c=".$Data3;
        $xml = simplexml_load_file($req)
            or die('XMLパースエラー');
        echo  $xml->Routes->Route[0]->Summary->TotalToll;
    }
    else{
        echo  $xml->Routes->Route[0]->Summary->TotalToll;
    }
?>