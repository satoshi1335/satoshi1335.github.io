function display_cost(){
    var Highway_cost = document.getElementsByClassName("Highway_cost");
    var Highway_total_cost= 0;
    for(i=0; i<Highway_cost.length; i++){
            Highway_total_cost = Number(Highway_total_cost) + Number(Highway_cost[i].title);
    }
    displayTotalCost(Highway_total_cost);
}

//Display Travel Cost & Gas Cost & Rest Budget
function displayTotalCost(Highway_total_cost){
    //Travel Cost
    var cost_array = document.getElementsByClassName("cost");
    var travel_cost = 0;
    for(i=0; i<cost_array.length; i++){
        if(cost_array[i].parentNode.parentNode.id !== 'pallet' &&cost_array[i].parentNode.parentNode.id !== 'recommend'){
            travel_cost = Number(travel_cost) + Number(cost_array[i].title);
        }
    }
    document.getElementById("travel_cost").innerHTML = travel_cost + "円/人";

    //Gas Cost
    var gas_cost = Math.round(total_distance*Number(document.gas.gas_price.value)/(Number(document.gas.efficiency.value)*1000));
    document.getElementById("gas_cost").innerHTML="ガソリン代 " + gas_cost + "円";

    //Display the rest budget by counting
    var speed = 1;
    var tgt = Math.round((Number(document.route_option.budget.value) - (gas_cost + Highway_total_cost)/Number(document.route_option.num_of_members.value) - travel_cost)/10)*10;
    var budget = pre_budget;
    setInterval(function(){
        if(budget === tgt){
            return;
        }
        else if(budget > tgt){
            budget = budget -10;
            $('#total_cost').html("残り <span id='cost_number'>" + budget +"</span> 円/人");
            if(budget<0){
                   $("#cost_number").css("color", "red");
            }
        }
        else{
            budget = budget + 10;
            $('#total_cost').html("残り <span id='cost_number'>" + budget +"</span> 円/人");
            if(budget < 0){
                $("#cost_number").css("color", "red");
        
            }
        }
    },speed);
    pre_budget = tgt;
}

// Display Highway cost & call displayTotalCost
function displayToll(i,routeNum,Highway_cost) {
    // on github we cannot use php so
    i = routeNum;
    
    if(i == routeNum){
        displayTotalCost(Highway_cost);
    }
    else if(departureIC[i] && departureIC[i]!== arrivalIC[i]){
        $.get("./php/kousoku.php",
                {   departureIC: encodeURI(departureIC[i]),
                    arrivalIC: encodeURI(arrivalIC[i]),
                    type:route_option.car_type.value,
                    departurePrefecture: encodeURI(departurePrefecture[i]),
                    arrivalPrefecture: encodeURI(arrivalPrefecture[i])
                },
                function(data){
                    if(data === null){
                        $("#toll"+i).html("高速料金を取得できませんでした");
                    }
                    else if(document.getElementById("toll"+i)){
                        $("#toll"+i).html(data + "円");
                        document.getElementById("toll"+i).title = data;
                        Highway_cost = Highway_cost + Number(data);
                    }
                    setTimeout(displayToll(i+1,routeNum,Highway_cost),1000);
                }
        )
    }
    else{
        displayToll(i+1,routeNum,Highway_cost);
    }
}


//Display IC Names & Call displayToll(0)
function displayHighwayIC(routeNum){
    var IC = "";
    for(var i=0; i<routeNum; i++){
        if(departureIC[i] && departureIC[i]!== arrivalIC[i]){
            IC =    IC + 
                    Number(i+1) +
                    ". " + 
                    departureIC[i] + 
                    " 〜 " + 
                    arrivalIC[i] + 

                    "<div id = 'toll"+
                    i+
                    "' class = 'Highway_cost' style ='display: inline;'></div><br>"
                    ;
        }
    }
    document.getElementById('displayIC').innerHTML = IC;
    displayToll(0,routeNum,0);
}



//open detail of cost
function displayDetailOfCost(){
    document.getElementById('detail_of_cost').style.display="block";
    document.getElementById('hide_cost_button').style.display="block";
    document.getElementById('display_cost_button').style.display="none";
}

//close detail of cost
function hideDetailOfCost(){
    document.getElementById('detail_of_cost').style.display="none";
    document.getElementById('hide_cost_button').style.display="none";
    document.getElementById('display_cost_button').style.display="block";
}