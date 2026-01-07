// Smartphone Nav
$('.spBtn').on('click', function () {
	$(this).toggleClass('isActive');
	$('.spNav').toggleClass('isActive');
	return false;
});
$('.spNav a[href]').on('click', function () {
	$('.spBtn').removeClass('isActive');
	$('.spNav').removeClass("isActive");
});

// Smooth Scroll
$('a[href^="#"]').on('click', function () {
	var speed = 400;
	var href = $(this).attr('href');
	var target = $(href === '#' || href === '' ? 'html' : href);

	if (target.length) {
		var headerHeight = $('header').outerHeight();
		var position = target.offset().top - headerHeight;

		$('html, body').animate({
			scrollTop: position
		}, speed, 'swing');
	}
	return false;
});

// Scroll Activation
$(window).on("scroll", function () {
	if ($(window).scrollTop() > 200) {
		$("header").addClass("isActive");
		$(".pagetopNav").addClass("isActive");
	} else {
		$("header").removeClass("isActive");
		$(".pagetopNav").removeClass("isActive");
	}
});

// Fade In Effect
$(window).scroll(function () {
	$('.fadeIn').each(function () {
		var elemPos = $(this).offset().top;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll > elemPos - windowHeight + 100) {
			$(this).addClass('isActive');
		}
	});
});
