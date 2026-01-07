// Smartphone Nav
$('.l-header__hamburger').on('click', function () {
  $(this).toggleClass('is-active');
  $('.l-header__nav').toggleClass('is-active');
  return false;
});

$('.l-header__nav a[href]').on('click', function () {
  $('.l-header__hamburger').removeClass('is-active');
  $('.l-header__nav').removeClass('is-active');
});

// Smooth Scroll
$('a[href^="#"]').on('click', function () {
  const speed = 400;
  const href = $(this).attr('href');
  const target = $(href === '#' || href === '' ? 'html' : href);

  if (target.length) {
    const headerHeight = $('header').outerHeight();
    const position = target.offset().top - headerHeight;

    $('html, body').animate({
      scrollTop: position
    }, speed, 'swing');
  }
  return false;
});

// Scroll Activation
$(window).on("scroll", function () {
  if ($(window).scrollTop() > 200) {
    $(".l-header").addClass("is-active");
    $(".c-pagetop").addClass("is-active");
  } else {
    $(".l-header").removeClass("is-active");
    $(".c-pagetop").removeClass("is-active");
  }
});

// Fade In Effect
$(window).scroll(function () {
  $('.c-fadein').each(function () {
    const elemPos = $(this).offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll > elemPos - windowHeight + 100) {
      $(this).addClass('is-active');
    }
  });
});