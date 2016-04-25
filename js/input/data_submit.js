function submit_data(){
    if(document.input_form.destination_address1.value === ''){
        alert('目的地を一番上のフォームに入力してください');
        slider.goToSlide(4);
    }
    else if(document.input_form.from.value === '' || document.input_form.to.value === ''){
        alert('日程を入力してください');
        slider.goToSlide(3);

    }
    else if(document.input_form.departure_address.value === '' ){
        alert('出発地を登録してください');
        slider.goToSlide(6);
    }
    else if(document.input_form.end_address.value === '' ){
        alert('解散する場所を登録してください');
        slider.goToSlide(8);
    }
    else{
        document.input_form.submit();
        return false;
    }
}