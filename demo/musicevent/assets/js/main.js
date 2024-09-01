/*=========================================
	Preload Spinner
=========================================*/
$(window).on('load', function(){
	setTimeout(removeLoader, 200);
});
function removeLoader(){
	$( ".preloadSpinner" ).fadeOut(100, function() {
	$( ".preloadSpinner" ).remove();  
	});  
}


$(document).ready(function($){

/*=========================================
				Header
	=========================================*/

	$(window).on("scroll", function() {

		var scroll = $(window).scrollTop();
	
		if (scroll > 1) {
	
		$("header").addClass("fixed-top");
	
		} else {
	
		$("header").removeClass("fixed-top");
	
		}
	
	});
	
	
	// Nav Bar on Mobile
	
	$(" .navbar .nav .nav-item .nav-link").click(function(){
	
		$(".navbar-collapse").removeClass("show");
		$(".navbar-toggler").removeClass("close");
	
	})

	$(document).on('click', 'body', function() {

		if ($('#navbarNav').hasClass('show')){
			$('#navbarNav').removeClass('show');
			$(".navbar-toggler").toggleClass("close");
		}
		
	});

	$(".navbar-toggler").click(function(){
		$(".navbar-toggler").toggleClass("close");
		

	});
	
	
	

	// Tabbing



	$('.tablinks').click(function (event){

		event.preventDefault();

		let showTargetId = $(this).data('id');

		$('.tabtarget').each(function (){

			if($(this).hasClass(showTargetId)){

				$(this).removeClass('d-none');

			} else {

				$(this).addClass('d-none');

			}

		});

	});





	if ($("#header-wrap").length) {

		var divHeight = $('#header-wrap').height();

		$('#content').css('margin-top', divHeight + 'px');

	}



	/* ---------- Banner Timer ----------*/

	    

	if($("#countdownTimer").length){

	

		var deadline = new Date("dec 31, 2024 15:37:25").getTime();

	

		var x = setInterval(function () {

	

			var now = new Date().getTime();

			var t = deadline - now;

			var days = Math.floor(t / (1000 * 60 * 60 * 24));

			var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

			var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));

			var seconds = Math.floor((t % (1000 * 60)) / 1000);

			$('#day').html(days);

			$('#hour').html(hours);

			$('#minute').html(minutes);

			$('#second').html(seconds);

			if (t < 0) {

				clearInterval(x);

				document.getElementById("demo").innerHTML = "TIME UP";

				document.getElementById("day").innerHTML = '0';

				document.getElementById("hour").innerHTML = '0';

				document.getElementById("minute").innerHTML = '0';

				document.getElementById("second").innerHTML = '0';

			}

		}, 1000);

	}

	



	/*=========================================

		06. Order Form

	=========================================*/

	Stripe.setPublishableKey('pk_test_18lgnnPV3SZZn36tyAFO131T00P2pCl90m');
		function stripeResponseHandler(status, response) {
			if (response.error) {

				$(".payment-status").html('<p>' + response.error.message + '</p>');
				return false;

			} else {
				var form$ = $("#order-form");
				// Get token id
				var token = response.id;

				$("#stripeToken").val(token);
				var formData = $('#order-form').serialize();
				$.ajax({
					type: 'POST',
					url: 'stripe/stripe_payment.php',
					dataType: "json",
					data: formData,
					beforeSend: function() {
					$('#loader').show();
					},
					success: function (data) {
					$('#loader').hide();
						if (data.success) {
							window.location.href="thankyou.html";
							return false;
							$('#order-form').attr('id', 'ssss');
							$('#sss').submit();
							$('.form-status').addClass('alert alert-success');
							$('.form-status').text('Your Message Has been Sent Successfully');
							
							$('.form-status').slideDown().delay(3000).slideUp();

						} else { 
							window.location.href="order-cancelled.html";
							return false;
							$('.form-status').addClass('alert alert-danger');
							$('.form-status').text('Error Occurred, Please Try Again');
							$('.form-status').slideDown().delay(3000).slideUp();
						}
					},
					error: function (xhr, status, error) {
						window.location.href="order-cancelled.html";
						return false;
						$('.form-status').addClass('alert alert-danger');
						$('.form-status').text('Something Went Wrong');
						$('.form-status').slideDown().delay(3000).slideUp();
						$('#loader').hide();
					}
				});

				return false;
			}
		}

		$('#stripepay').click(function () {
			$('#order-form').attr('action', 'stripe/stripe_payment.php');
			$('#card_number').attr('required', true);
			$('#card_exp_month').attr('required', true);
			$('#card_exp_year').attr('required', true);
			$('#card_cvc').attr('required', true);
			$('#paymentdiv').show();
		});
		$(document).on("click", "#paypalpay", function () {
			$('#order-form').attr('action', 'https://www.paypal.com/cgi-bin/webscr');
			$('#card_number').removeAttr("required");
			$('#card_exp_month').removeAttr("required");
			$('#card_exp_year').removeAttr("required");
			$('#card_cvc').removeAttr("required");
			$('#paymentdiv').hide();
		});
		let ch = 1;
	if ($("#order-form").length) {
		$("#order-form").validate({
			errorPlacement: function (error, element) {
				return true;
			},
			rules: {
				first_name: {
					required: true,
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true,
					number: true,
					minlength: 10
				},
				billing_address: {
					required: true,
				},
				city: {
					required: true,
				},
				state: {
					required: true,
				},
				zip: {
					required: true,
				},
				country: {
					required: true,
				}
			},
			submitHandler: function (form) {
				var form = document.getElementById('order-form');
				for (var i = 0; i < form.elements.length; i++) {
				  
					 if((form.elements[i].getAttribute('class') && form.elements[i].getAttribute('class').includes('error'))===true){
				         return false;
					 }
					 
				}
				
				if($('#stripepay').is(':checked')){

				let ddf = Stripe.createToken({
					number: $('#card_number').val(),
					exp_month: $('#card_exp_month').val(),
					exp_year: $('#card_exp_year').val(),
					cvc: $('#card_cvc').val()
				}, stripeResponseHandler);
				return false;
			} else {
				
				if(ch == 1){
					event.preventDefault();
					ch = 2;
				} else {
					return true;
				}
				setTimeout(function(){ $('#order-form').submit() }, 5000);
				var formData = $('#order-form').serialize();
				

				$.ajax({
					type: 'POST',
					url: 'assets/php/order-form.php',
					dataType: "json",
					data: formData,
					beforeSend: function() {
						
                      $('#loader').show();
					},
					success: function (data) {
					     $('#loader').hide(); 
						if (data.success) {
							$('.form-status').addClass('alert alert-success');
							$('.form-status').text('Your Message Has been Sent Successfully');
							$('.form-status').slideDown().delay(3000).slideUp();
							
						} else {
							$('.form-status').addClass('alert alert-danger');
							$('.form-status').text('Error Occurred, Please Try Again');
							$('.form-status').slideDown().delay(3000).slideUp();
						}
					},
					error: function (xhr, status, error) {
						if(ch == 1){
						$('.form-status').addClass('alert alert-danger');
						$('.form-status').text('Something Went Wrong');
						$('.form-status').slideDown().delay(3000).slideUp();
						//$('#loader').hide();
						}
					}
				});
				return true;
			}
			
			return false;
				
			}
		});
	}
	$('#paypalpay').click();

	/*=========================================

		05. Registration Form

	=========================================*/

	if($("#free-consultation-form").length) {

		$('#free-consultation-form').validate({

			errorPlacement: function(error, element) {

				return true;

			},

			rules: {

				full_name: {

					required: true,

					minlength: 3

				},

				email: {

					required: true,

					email: true

				},

			},

			submitHandler: function(form) {

				var formData = $('#free-consultation-form').serialize();

				$.ajax({

					type: 'POST',

					url: 'assets/php/popup-form.php',

					dataType: "json",

					data: formData,

					success: function(data) {

						if(data.success) {

							$('.form-status').addClass('alert alert-success');

							$('.form-status').text('Your Message Has been Sent Successfully');

							form.submit();

							$('.form-status').slideDown().delay(3000).slideUp();

							$("#free-consultation-form").trigger("reset");

							window.location.href = 'oto.html';

						} else {

							$('.form-status').addClass('alert alert-danger');

							$('.form-status').text('Error Occurred, Please Try Again');

							$('.form-status').slideDown().delay(3000).slideUp();

						}

					},

					error: function(xhr, status, error) {

						$('.form-status').addClass('alert alert-danger');

						$('.form-status').text('Something Went Wrong');

						$('.form-status').slideDown().delay(3000).slideUp();

					}

				});

			}

		});

	}

	/*=========================================
		Back To Top
	=========================================*/
	$(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('.backtotop').fadeIn(100);
        } else { 
            $('.backtotop').fadeOut(100); 
        } 
    }); 
    $('.backtotop').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 100); 
        return false; 
    }); 

	// Jquery Code below for footer copyright Year
	$('#copyright_year').html(new Date().getFullYear());

});