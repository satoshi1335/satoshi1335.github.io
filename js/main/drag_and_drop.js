//Global Variable
var start_id;       // id of cell where dragging start

/*Drag Start*/
function f_dragstart(event){
    var target_id = event.target.id;
    var drag_elm =document.getElementById(target_id);
    var parent_elm = drag_elm.parentNode;
    start_id = parent_elm.id;
    markersArray.forEach(closeInfowindow);
    event.dataTransfer.setData("text", target_id);
    map.panTo(markersArray[Number(target_id)-1000000].position);
    markersArray[Number(target_id)-1000000].infowindow.open(map,markersArray[Number(target_id)-1000000]);
}

/*Close Infowindow*/
function closeInfowindow(value){
    value.infowindow.close(map);
}

/*Dragging*/
function f_dragover(event){ 
    event.preventDefault();
}

/*Drop*/
function f_drop(event){
    markersArray.forEach(closeInfowindow);
    var id_name = event.dataTransfer.getData("text");
    var drag_elm =document.getElementById(id_name);
    
    if(Number(drag_elm.id) === 1000000){
        if(event.target.id === "pallet" || event.target.id === 'recommend'){
            drag_elm.style.height = 80 + "px";
            event.currentTarget.appendChild(drag_elm);
            event.preventDefault();
        }
        else if(Number(event.target.id)<999999){
            event.currentTarget.appendChild(drag_elm);
            drag_elm.style.height = 44 + "px";
            event.preventDefault();
        }
        else{
            event.preventDefault();
        }

        if(start_id !== event.target.id){
                displayRoute();
        }    
    }
    else{
        var length = drag_elm.firstChild.title;
        var cost = drag_elm.firstChild.nextSibling.title;
        var address = drag_elm.firstChild.nextSibling.nextSibling.title;
        if(event.target.id === "pallet" || event.target.id === 'recommend'){
            var marker = markersArray[Number(drag_elm.id)-1000000];
            marker.infowindow.setOptions({
                content:drag_elm.title,
            });
            google.maps.event.addListener(marker, 'mouseover', function() {
                marker.infowindow.open(map,marker);
            });
            google.maps.event.addListener(marker, 'mouseout', function() {
                marker.infowindow.close(map,marker);
            });
            
            drag_elm.style.height = 80 + "px";
            innerHTMLonPallet(drag_elm,drag_elm.title,length,cost,address);
            
            //Add the dragged element on the dropping point
            event.currentTarget.appendChild(drag_elm);
            event.preventDefault();
            var td = drag_elm.parentNode;
            var td_id = td.id;
            
            //cancele drop event to prepend error
            event.preventDefault();
            
            //back to origin place
            for(var i=0; i<length; i++){
                var addtd = document.getElementById(number_of_days*i+Number(start_id));
                addtd.style.display="table-cell";
            }
            document.getElementById(start_id).rowSpan = 1;
            displayRoute();
        }
        else if(Number(event.target.id)<999999){
            var m = 0;
            for(var i=0; i<length; i++){
                var area = number_of_days*i + Number(event.target.id);
                var confirm = document.getElementById(area);
                if(confirm.firstChild === null){    
                    m=m;
                }
                else if(document.getElementById(start_id).firstChild === confirm.firstChild){
                    m=m;
                }
                else{
                    m++;
                }
            }
            if(m === 0){
                innerHTMLonSchedule(drag_elm,event.target,drag_elm.title,length,cost,address);
                var marker = markersArray[Number(drag_elm.id)-1000000];
                marker.infowindow.setOptions({
                    content:
                    drag_elm.title +
                    "<br>(" +
                    Math.floor(Number(event.target.id)/number_of_days)  +
                    "時〜" +
                    Math.floor(Number(event.target.id)/number_of_days + Number(length)) +
                    "時)"
                });
                google.maps.event.addListener(marker, 'mouseover', function() {
                    marker.infowindow.open(map,marker);
                });
                google.maps.event.addListener(marker, 'mouseout', function() {
                    marker.infowindow.close(map,marker);
                });
                
                event.currentTarget.appendChild(drag_elm);
                event.preventDefault();
                displayRoute();
                var td = drag_elm.parentNode;
                var td_id = td.id;
                //cancele drop event to prepend error
                event.preventDefault();
                if(start_id !== 'pallet' && start_id !== 'recommend'){
                    //back to origin place
                    for(var i=0; i<length; i++){
                        var addtd = document.getElementById(number_of_days*i+Number(start_id));
                        addtd.style.display="table-cell";
                    }
                    document.getElementById(start_id).rowSpan = 1;
                }
                else{
                    drag_elm.style.height = 44*Number(length) + "px"; 
                }
                //delete table by rowSpan
                td.rowSpan = length;
                for(var i=1; i<length; i++){
                    var rmtd_id = number_of_days*i + Number(td_id);
                    var rmtd = document.getElementById(rmtd_id);
                    rmtd.style.display="none";
                }
            }
            else{
                event.preventDefault();
            }
        }
        else{
            event.preventDefault();
        }
    }   
}