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
	# Document Ready
=========================================*/
$(document).ready(function() {
	var counters = $(".count");
	var countersQuantity = counters.length;
	var counter = [];
	/* ================================================== */
	/* Counter */
	/* ================================================== */
	for (i = 0; i < countersQuantity; i++) {
		counter[i] = parseInt(counters[i].innerHTML);
	}
	var count = function(start, value, id) {
		var localStart = start;
		setInterval(function() {
			if (localStart < value) {
				localStart++;
				counters[id].innerHTML = localStart;
			}
		}, 0.1);
	}
	for (j = 0; j < countersQuantity; j++) {
		count(0, counter[j], j);
	}
	/* ================================================== */
	/* FAQ */
	/* ================================================== */
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
	/* ================================================== */
	/* jQuery Smooth Scroll and go to destination. */
	/* ================================================== */
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
	/*Order Form */
	/*=========================================*/
	var length = $("#order-form").length;
	if ($("#order-form").length) {
		$("#order-form").validate({
			errorPlacement: function(error, element) {
				return true;
			},
			rules: {
				first_name: {
					required: true,
					minlength: 3
				},
				last_name: {
					required: true,
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true,
				},
				date: {
					required: true,
				},
				country: {
					required: true,
				},
				salary: {
					required: true,
				},
				amount: {
					required: true,
				},
				residence: {
					required: true,
				},
				purpose: {
					required: true,
				},
			},
			submitHandler: function(form) {
				var formData = $('#order-form').serialize();
				$.ajax({
					type: 'POST',
					url: 'assets/php/order-form.php',
					dataType: "json",
					data: formData,
					success: function(data) {
						if (data.success) {
							$('.form-status').addClass('alert alert-success');
							$('.form-status').text('Your Message Has been Sent Successfully');
							$('.form-status').slideDown().delay(3000).slideUp();
							$("#order-form").trigger("reset");
							   window.location.href = "thank-you.html";
						
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
		// Jquery Code below for footer copyright Year
		$('#copyright_year').html(new Date().getFullYear());
});