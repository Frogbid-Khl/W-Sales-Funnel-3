/*=========================================
	# Preload Spinner
=========================================*/
$(window).on('load', function() {
	setTimeout(removeLoader, 300);
});

function removeLoader() {
	$(".preloadSpinner").fadeOut(100, function() {
		$(".preloadSpinner").remove();
	});
}
/*=========================================
	# Header
=========================================*/
$(window).on("scroll", function() {
	var scroll = $(window).scrollTop();
	if (scroll > 1) {
		$("header").addClass("fixed-top");
	} else {
		$("header").removeClass("fixed-top");
	}
});
/*=========================================
    # Back To Top
=========================================*/
$(window).scroll(function() {
	if ($(this).scrollTop() > 100) {
		$('.backtotop').fadeIn(100);
	} else {
		$('.backtotop').fadeOut(100);
	}
});
$('.backtotop').click(function() {
	$("html, body").animate({
		scrollTop: 0
	}, 100);
	return false;
});
/*=========================================
	# Document Ready
=========================================*/
$(document).ready(function() {
	/*=========================================
		# jQuery Smooth Scroll and go to destination
	=========================================*/
	jQuery('.navbar-nav a').on('click', function(e) {
		if (this.hash != "") {
			e.preventDefault();
			var hash = this.hash;
			jQuery('html, body').animate({
				scrollTop: jQuery(hash).offset().top - 50
			}, 300);
			if ($(window).width() < 768) {
				jQuery('html, body').animate({
					scrollTop: jQuery(hash).offset().top - 40
				}, 300);
			}
		}
	});
	/*=========================================
	    # Mobile Menu Icon
	=========================================*/
	$(".navbar .nav .nav-item .nav-link").click(function() {
		$(".navbar-collapse").removeClass("show");
	})
	/*=========================================
        # FAQ
    =========================================*/
	function close_accordion_section() {
		$('.accordion .accordion-section-title').removeClass('active');
		$('.accordion .accordion-section-content').slideUp(300).removeClass('open');
	}
	$('.accordion-section-title').click(function(e) {
		// Grab current anchor value
		var currentAttrValue = $(this).attr('href');
		if ($(e.target).is('.active')) {
			close_accordion_section();
		} else {
			close_accordion_section();
			// Add active class to section title
			$(this).addClass('active');
			// Open up the hidden content panel
			$('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
		}
		e.preventDefault();
	});
	/*=========================================
	    # Footer Copyrights Year
	=========================================*/
	$('#copyright_year').html(new Date().getFullYear());
	/*=========================================
		Order Form
	=========================================*/
	// if ($("#order-form").length) {
	// 	$("#order-form").validate({
	// 		errorPlacement: function(error, element) {
	// 			return true;
	// 		},
	// 		rules: {
	// 			first_name: {
	// 				required: true,
	// 				minlength: 3
	// 			},
	// 			email: {
	// 				required: true,
	// 				email: true
	// 			},
	// 			phone_number: {
	// 				required: true,
	// 			},
	// 			billing_address: {
	// 				required: true,
	// 			},
	// 			city: {
	// 				required: true,
	// 			},
	// 			state: {
	// 				required: true,
	// 			},
	// 			zip: {
	// 				required: true,
	// 			},
	// 			country: {
	// 				required: true,
	// 			}
	// 		},
	// 		submitHandler: function(form) {
	// 			var formData = $('#order-form').serialize();
	// 			$.ajax({
	// 				type: 'POST',
	// 				url: 'assets/php/order-form.php',
	// 				dataType: "json",
	// 				data: formData,
	// 				success: function(data) {
	// 					if (data.success) {
	// 						$('.form-status').addClass('alert alert-success');
	// 						$('.form-status').text('Your Message Has been Sent Successfully');
	// 						$('.form-status').slideDown().delay(3000).slideUp();
	// 						$("#order-form").trigger("reset");
	// 						form.submit();
	// 					} else {
	// 						$('.form-status').addClass('alert alert-danger');
	// 						$('.form-status').text('Error Occurred, Please Try Again');
	// 						$('.form-status').slideDown().delay(3000).slideUp();
	// 					}
	// 				},
	// 				error: function(xhr, status, error) {
	// 					$('.form-status').addClass('alert alert-danger');
	// 					$('.form-status').text('Something Went Wrong');
	// 					$('.form-status').slideDown().delay(3000).slideUp();
	// 				}
	// 			});
	// 		}
	// 	});
	// }
	/* ================================================== 
	 	# Order Form New
	================================================== */
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
							window.location.href="thank-you.html";
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
});