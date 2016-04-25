//Calendar
$(function() {
    $("#datepicker1").datepicker({
        dateFormat: "yy/mm/dd",
        altField: "#from_num",
        altFormat: "oo",
        minDate: new Date(),
        onSelect: function(dateText, inst) {
            $("#from").val(dateText);
            var date = new Date(dateText);
            var m = date.getDate();
            date.setDate(m+3);
            $('#datepicker2').datepicker( "option", "minDate", dateText);
            $('#datepicker2').datepicker( "option", "maxDate", date);

        }
    });
    $("#datepicker2").datepicker({
        dateFormat: "yy/mm/dd",
        altField: "#to_num",
        altFormat: "oo",
        minDate: new Date(),
        onSelect: function(dateText, inst) {
            $("#to").val(dateText);
            var date = new Date(dateText);
            var m = date.getDate();
            date.setDate(m-3);
            $('#datepicker1').datepicker( "option", "maxDate", dateText);
            $('#datepicker1').datepicker( "option", "minDate", date);
        }
    });
}); 