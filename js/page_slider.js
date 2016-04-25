//Page Slider
$(document).ready(function(){
    slider = $('.slider').bxSlider({
    	responsive: true,
        infiniteLoop:false,
        hideControlOnEnd:true,
        prevText: '<',
        nextText: '>'
    });
});