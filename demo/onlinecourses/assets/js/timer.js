$(document).ready(function($) {

    /*=========================================
        Countdown Timmer
    =========================================*/
    // Please edit date and time as per your need 
    $('#counter').countdown('2024/12/31 00:00:00', function(event) {
        $('#days').html(event.strftime('%D'));
        $('#hours').html(event.strftime('%H'));
        $('#minutes').html(event.strftime('%M'));
        $('#seconds').html(event.strftime('%S'));
    });

});