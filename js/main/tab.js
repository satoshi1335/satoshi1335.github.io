function ChangeTab(tabid){
    document.getElementById('pallet').style.display = 'none';
    document.getElementById('reserve').style.display = 'none';
    document.getElementById('recommend').style.display = 'none';
    document.getElementById(tabid).style.display = 'block';
}   

function ChangeMainTab(tabid){
    document.getElementById('schedule').style.zIndex = '0';
    document.getElementById('map_canvas').style.zIndex = '0';
    document.getElementById(tabid).style.zIndex = '1';
} 