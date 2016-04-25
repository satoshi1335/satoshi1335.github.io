//Add Schedule Card
function addSchedule() {
    var element = document.createElement('div');
    element.id = l;
    element.title = document.plan.B.value;      
    element.className = 'a';
    innerHTMLonPallet(element,document.plan.B.value,document.plan.C.value,document.plan.D.value,document.plan.E.value);
    element.style.height =80+"px";
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
    var objBody = document.getElementById('pallet'); 
    objBody.appendChild(element);
    l++;    
}

//Edit Schedule Card
function editSchedule(element){
    var parent = element.parentNode;
    var parent_id = parent.id;
    var parent_title = parent.title;
    parent.draggable = false;
    var address = parent.firstChild.nextSibling.nextSibling.title;
    parent.innerHTML =  "<div hidden title ="+
                parent.firstChild.title +
                "></div>"+

                "<div hidden title ="+
                address +
                "></div>"+

                "<form name = 'update' style = 'display: inline;'>" +
                "<input size='10' type = 'text' id='"+
                parent_id +
                "B' value=" +
                parent_title +
                ">"+

                "<input type = 'number' id= '"+
                parent_id +
                "C' min='1' value="+
                parent.firstChild.title +
                " style ='width: 40px;' required>"+
                "時間" +

                "<input type = 'number' id='"+
                parent_id +
                "D'min='0' step='1000' value=" +
                parent.firstChild.nextSibling.title +
                " style = 'width:100px;' required>"+
                "円"+
                
                "<input size='10' type = 'text' id='"+
                parent_id +
                "E' value=" +
                address +
                ">"+

                "</form>"+

                "<button" +

                " onclick='editMarker(this)' style='display:inline;'>保存</button>"
                ;
}

//Decide Schedule after Edit Schedule 
function saveSchedule(element){
    var parent = element.parentNode;
    var grandparent = parent.parentNode;
    var original_length = parent.firstChild.title;
    var updateB = parent.id + "B";
    var updateC = parent.id + "C";
    var updateD = parent.id + "D";
    var updateE = parent.id + "E";
    var place = document.getElementById(updateB).value;
    var length = document.getElementById(updateC).value;
    var cost = document.getElementById(updateD).value;
    var address = document.getElementById(updateE).value;
    var original_length = parent.firstChild.title;
    if(grandparent.id === "pallet" || grandparent.id==="recommend"){
        parent.title = place;
        parent.draggable = true;
        innerHTMLonPallet(parent,place,length,cost,address);
    }
    else{
        var span = Number(length) - Number(original_length);    
        if(span > 0){
            var m = 0;
            for(var i=1; i<length; i++){
                var area = number_of_days*i + Number(grandparent.id);
                var confirm = document.getElementById(area);
                if(confirm.firstChild === null){    
                    m=m;
                }
                else{
                    m++;
                }
            }
            if(m === 0){
                parent.title = place;
                parent.draggable = true;
                innerHTMLonSchedule(parent,grandparent,place,length,cost,address);
                parent.style.height = 43*Number(length) +"px";
                grandparent.rowSpan = length;
                for(var i=0; i<span; i++){
                    var rmtd_id = Number(grandparent.id)+number_of_days*i + number_of_days*Number(original_length);
                    var rmtd = document.getElementById(rmtd_id);
                    rmtd.style.display="none";
                } 
                grandparent.rowSpan = length;   
                for(var i=0; i<span*-1; i++){
                    var addtd_id = Number(grandparent.id) + number_of_days*Number(length) + number_of_days*i;
                    var addtd = document.getElementById(addtd_id);
                    addtd.style.display="table-cell";
                    addtd.rowSpan = 1;
                }
                
            }
            else{
                alert("予定がかぶってしまいます.時間を短く調節してください");
                parent.draggable = true;
                innerHTMLonSchedule(parent,grandparent,place,original_length,cost,address);
            }
        }
        else{   
            parent.title = place;
            parent.draggable = true;
            innerHTMLonSchedule(parent,grandparent,place,length,cost,address);
            parent.style.height = 43*Number(length) +"px";
            grandparent.rowSpan = length;
            for(var i=0; i<span; i++){
                var rmtd_id = Number(grandparent.id)+number_of_days*i + number_of_days*Number(original_length);
                var rmtd = document.getElementById(rmtd_id);
                rmtd.style.display="none";
            } 
            grandparent.rowSpan = length;   
            for(var i=0; i<span*-1; i++){
                var addtd_id = Number(grandparent.id) + number_of_days*Number(length) + number_of_days*i;
                var addtd = document.getElementById(addtd_id);
                addtd.style.display="table-cell";
                addtd.rowSpan = 1;
            }
        }
    }
    var Highway_cost = document.getElementsByClassName("Highway_cost");
    var Highway_total_cost= 0;
    for(i=0; i<Highway_cost.length; i++){
            Highway_total_cost = Number(Highway_total_cost) + Number(Highway_cost[i].title);
    }
    displayTotalCost(Highway_total_cost);  
}

//Delete Schedule Card
function deleteSchedule(element) {
    var flg = confirm("削除しますか？");
    if(flg == true){
        var parent = element.parentNode;
        var grandparent = parent.parentNode;
        var length = parent.firstChild.title;
        var parent_id = grandparent.id;
        var dates = Math.floor((Math.floor(Number(parent_id)/number_of_days)+ Number(length))/24);
        var start_date = Number(grandparent.id)%number_of_days;
        grandparent.removeChild(parent);
        if(grandparent.id !=='pallet' && grandparent.id !== 'recommend'){
            grandparent.rowSpan = 1;
            for(var i=start_date+1; i<start_date + dates + 1; i++){
                var rmelm = document.getElementById(i);
                rmelm.removeChild(rmelm.firstChild);
                rmelm.rowSpan = 1;
            }
            for(var i=0; i<length; i++){
                var rmtd_id = index_of_schedule[Math.floor(Number(parent_id)/number_of_days) + (Number(parent_id)%number_of_days)*24 +i];
                var rmtd = document.getElementById(rmtd_id);
                rmtd.style.display="table-cell";
            }
            deleteMarkerOnSchedule(parent);
        }
        else{
            deleteMarkerOnPallet(parent);
        }
    }
    else{
        return;
    }
}

//Add End Schedule Card
function addEndSchedule() {
    var element = document.createElement('div');
    element.id = 1000000;
    element.title = document.plan.B.value;      
    element.className = 'end';
    element.innerHTML = "<div hidden class=length title=" +
            1 +
            "></div>"+

            "<div hidden class=cost title=" +
            0 +
            "></div>"+
            "<div hidden class=address title=" +
            end_address +
            "></div>"+
            "<b>"+ plan_name +"終了" +"</b>";
    element.style.height =80+"px";
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
    var objBody = document.getElementById('pallet'); 
    objBody.appendChild(element);
}

//Add Reccomended Schedule on the Recommend Pallet
function addRecommendedSchedule(place){
    var price_level = ["0","1000","3000","10000","30000"];
    var element = document.createElement('div');
    var link;

    element.id = l;
    element.title = place.name;     
    element.className = 'a';
    if(place.price_level != null){
        var price = price_level[place.price_level];
    }
    else{
        var price = 0;
    }
    if(place.website != null){
        var link= "<a href='"+place.website+"' style='color:black;' target = '_blank'>" + place.name + "</a>";
        innerHTMLofRecommend(element,link,1,price,place.vicinity,place.website);
    }
    else{
        innerHTMLonPallet(element,place.name,1,price,place.vicinity);
    }
    element.style.height =80+"px";
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
    var objBody = document.getElementById('recommend'); 
    objBody.appendChild(element);
    l++;
}


//Add Fixed Schedule Card
function addReservedSchedule(){
    var start_date = document.reserved_plan.start_date.value;
    var end_date = document.reserved_plan.end_date.value;
    var start_time = document.reserved_plan.start.value;
    var end_time = document.reserved_plan.end.value;
    var added_place_id = number_of_days*Number(start_time)+ Number(start_date)-1;
    var added_place = document.getElementById(added_place_id);
    var span = 24*(Number(end_date)-Number(start_date))+Number(end_time)- Number(start_time);
    var cost = document.reserved_plan.cost.value;
    var address = document.reserved_plan.address.value;
    var date_span=[];

    if(start_date > end_date){
        alert("開始日・終了日を確認してください");
    }
    else if(start_date === end_date && Number(start_time) > Number(end_time)){
        alert("開始時間・終了時間を確認してください");
    }
    else{
        if(start_date === end_date){
            date_span[start_date] = Number(end_time) - Number(start_time);
        }
        else{
            date_span[start_date] = 24 - Number(start_time);
            date_span[end_date] = Number(end_time);
        }
        for(var j=Number(start_date); j<=Number(end_date); j++){
            if(j===Number(start_date)){
                var element = document.createElement('div');
                element.id = l;
                element.title = document.reserved_plan.name.value;
                element.className = 'd';
                innerHTMLofReservedSchedule(element,added_place,element.title,span,cost,address);
                element.style.height =43*Number(date_span[j]) +"px";
                element.draggable = false;

                var objBody = document.getElementById(added_place_id); 
                objBody.appendChild(element);
                added_place.rowSpan= date_span[j];
                for(var i=1; i<date_span[j]; i++){
                    var rmtd_id = Number(added_place_id)+number_of_days*i;
                    var rmtd = document.getElementById(rmtd_id);
                    rmtd.style.display="none";
                }
            }   
            else if(j === Number(end_date)){
                element = document.createElement('div');
                element.className = 'd';
                element.title = "--続き--";
                element.style.height =43*Number(date_span[end_date]) +"px";
                element.draggable = false;

                objBody = document.getElementById(Number(end_date)-1); 
                objBody.appendChild(element);
                objBody.rowSpan= date_span[end_date];
                for(var i=1; i<date_span[end_date]; i++){
                    var rmtd_id = Number(end_date)-1+number_of_days*i;
                    var rmtd = document.getElementById(rmtd_id);
                    rmtd.style.display="none";
                }
            }
            else{   
                element = document.createElement('div');
                element.className = 'd';    
                element.title = "--続き--";
                element.style.height =43*24 +"px";
                element.draggable = false;
                objBody = document.getElementById(j-1); 
                objBody.appendChild(element);
                objBody.rowSpan= 24;
                for(var i=1; i<24; i++){
                    var rmtd_id = j-1+number_of_days*i;
                    var rmtd = document.getElementById(rmtd_id);
                    rmtd.style.display="none";
                }
            }   
        }
        l++;  
    }
    displayRoute();
}

//Add Hotel Schedule Card
function addHotelSchedule(title,start_date,end_date,start_time,end_time,cost){
    var added_place_id = number_of_days*Number(start_time)+ Number(start_date)-1;
    var added_place = document.getElementById(added_place_id);
    var span = 24*(Number(end_date)-Number(start_date))+Number(end_time)- Number(start_time);
    var date_span=[];
    if(start_date === end_date){
        date_span[start_date] = Number(end_time) - Number(start_time);
    }
    else{
        date_span[start_date] = 24 - Number(start_time);
        date_span[end_date] = Number(end_time);
    }
    for(var j=Number(start_date); j<=Number(end_date); j++){
        if(j===Number(start_date)){
            var element = document.createElement('div');
            element.id = l;
            element.title = title;
            element.className = 'b';
            innerHTMLofHotel(element,title,span,start_time,end_time,cost);
            
            element.style.height =43*Number(date_span[j]) +"px";
            element.draggable = false;

            var objBody = document.getElementById(added_place_id); 
            objBody.appendChild(element);
            added_place.rowSpan= date_span[j];
            for(var i=1; i<date_span[j]; i++){
                var rmtd_id = Number(added_place_id)+number_of_days*i;
                var rmtd = document.getElementById(rmtd_id);
                rmtd.style.display="none";
            }
        }   
        else {
            element = document.createElement('div');
            element.className = 'b';
            element.title = "--続き--";
            element.style.height =43*Number(date_span[end_date]) +"px";
            element.draggable = false;

            objBody = document.getElementById(Number(end_date)-1); 
            objBody.appendChild(element);
            objBody.rowSpan= date_span[end_date];
            for(var i=1; i<date_span[end_date]; i++){
                var rmtd_id = Number(end_date)-1+number_of_days*i;
                var rmtd = document.getElementById(rmtd_id);
                rmtd.style.display="none";
            }
        }
    }
    l++;
    displayRoute();
}

//Add Fixed Transportation Schedule Card
function addReservedTransfer() {
    var departure_place = document.reserved_transfer.departure_place.value;
    var departure_date = document.reserved_transfer.departure_date.value;
    var departure_time = document.reserved_transfer.departure_time.value;
    var arrival_place = document.reserved_transfer.arrival_place.value;
    var arrival_date = document.reserved_transfer.arrival_date.value;
    var arrival_time = document.reserved_transfer.arrival_time.value;
    var added_place_id = number_of_days*Number(departure_time)+ Number(departure_date)-1;
    var added_place = document.getElementById(added_place_id);
    var span = 24*(Number(arrival_date)-Number(departure_date))+Number(arrival_time)- Number(departure_time);
    var cost = document.reserved_transfer.cost.value;
    var date_span = [];
    if(Number(departure_date) >Number(arrival_date)){
        alert("出発日・到着日を確認してください");
    }
    else if(Number(departure_date) === Number(arrival_date) && Number(departure_time) > Number(arrival_time)){
        alert("出発時間・到着時間を確認してください");
    }
    else{   
        if(departure_date === arrival_date){
            date_span[departure_date] = Number(arrival_time) - Number(departure_time);
        }
        else{
            date_span[departure_date] = 24 - Number(departure_time);
            date_span[arrival_date] = Number(arrival_time);
        }
        for(var j=Number(departure_date); j<=Number(arrival_date); j++){
            if(j===Number(departure_date)){
                var element = document.createElement('div');
                element.id = l;
                element.title = document.reserved_transfer.name.value;
                element.className = 'c';
                innerHTMLofReservedTransfer(element,added_place,element.title,span,cost,departure_place,arrival_place);
                element.style.height =43*Number(date_span[departure_date]) +"px";
                element.draggable = false;
                var objBody = document.getElementById(added_place_id); 
                objBody.appendChild(element);
                added_place.rowSpan= date_span[departure_date];
                for(var i=1; i<date_span[departure_date]; i++){
                    var rmtd_id = Number(added_place_id)+number_of_days*i;
                    var rmtd = document.getElementById(rmtd_id);
                    rmtd.style.display="none";
                }   
            }   
            else if (j === Number(arrival_date)){
                element = document.createElement('div');
                element.className = 'c';
                element.title = "--続き--";
                element.style.height =43*Number(date_span[arrival_date]) +"px";
                element.draggable = false;

                objBody = document.getElementById(Number(arrival_date)-1); 
                objBody.appendChild(element);
                objBody.rowSpan= date_span[arrival_date];
                for(var i=1; i<date_span[arrival_date]; i++){
                    var rmtd_id = Number(arrival_date)-1+number_of_days*i;
                    var rmtd = document.getElementById(rmtd_id);
                    rmtd.style.display="none";
                }
            }
            else{   
                element = document.createElement('div');
                element.className = 'c';    
                element.title =  "--続き--";
                element.style.height =43*24 +"px";
                element.draggable = false;
                objBody = document.getElementById(j-1); 
                objBody.appendChild(element);
                objBody.rowSpan= 24;
                for(var i=1; i<24; i++){
                    var rmtd_id = j-1+number_of_days*i;
                    var rmtd = document.getElementById(rmtd_id);
                    rmtd.style.display="none";
                }
            }   
        }
        l=l+2;  
    }
    displayRoute();
}
    

//Delete Fixed Transportation Schedule Card 
function deleteTransfer(element) {
    var flg = confirm("削除しますか？");
    if(flg == true){
        var parent = element.parentNode;
        var grandparent = parent.parentNode;
        var length = parent.firstChild.title;
        var parent_id = grandparent.id;
        var dates = Math.floor((Math.floor(Number(parent_id)/number_of_days)+ Number(length))/24);
        var start_date = Number(grandparent.id)%number_of_days;
        grandparent.removeChild(parent);
        grandparent.rowSpan = 1;
        for(var i=start_date+1; i<start_date + dates + 1; i++){
            var rmelm = document.getElementById(i);
            rmelm.removeChild(rmelm.firstChild);
            rmelm.rowSpan = 1;
        }
        for(var i=0; i<length; i++){
            var rmtd_id = index_of_schedule[Math.floor(Number(parent_id)/number_of_days) + (Number(parent_id)%number_of_days)*24 +i];
            var rmtd = document.getElementById(rmtd_id);
            rmtd.style.display="table-cell";
        }
        deleteMarkerOfTransfer(parent);
    }
    else{
        return;
    }
}

