document.onkeydown = cancel_tab;

function cancel_tab(e) {
    if(e == undefined){
        if(event.keyCode==9){
            event.returnValue=false;
            return false;
        }
    } 
    else {
        if(e.which==9)
            return false;
    }
}