/*=========================================
	# Document Ready
=========================================*/
$(document).ready(function ($) {

    /*=========================================
    ## Countdown
    =========================================*/
    $('#counter').countdown('2024/12/11 17:35:00', function (event) {
        $('#days').html(event.strftime('%D'));
        $('#hours').html(event.strftime('%H'));
        $('#minutes').html(event.strftime('%M'));
        $('#seconds').html(event.strftime('%S'));
    });
    
});