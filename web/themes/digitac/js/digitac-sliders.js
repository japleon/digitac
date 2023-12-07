(function ($, Drupal) {



    // --------------------------------------
    // ----- SLIDERS ------
    // --------------------------------------

    // svg slider
    if ($(window).width() >= 768) {
        $('#training-carousel').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    // card type slider
    $('.js-card-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    if ($('.js-card-slider').length) {
        if ($(window).width() <= 480) {
            console.log('menor de 480');
            $('.js-card-slider').each(function () {
                var items = $(this).find('.block-slider-news__item');

                if (items.length < 2) {
                    console.log('menor de 2');
                    items.parents('.js-card-slider').find('.slick-dots').hide();
                }
            });
        } else if ($(window).width() >= 480 && $(window).width() < 1024) {
            console.log('estoy por debajo de 1024');
            $('.js-card-slider').each(function () {
                var items = $(this).find('.block-slider-news__item');

                if (items.length < 3) {
                    console.log('menor de 2');
                    items.parents('.js-card-slider').find('.slick-dots').hide();
                }
            });
        } else if ($(window).width() >= 1024) {
            console.log('estoy por encima de 1024');
            $('.js-card-slider').each(function () {
                var items = $(this).find('.block-slider-news__item');

                if (items.length < 4) {
                    items.parents('.js-card-slider').find('.slick-dots').hide();
                }
            });

        }
    }

    // horizontal card / single card
    $('.js-single-card-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true
    });

    if ($('.js-single-card-slider').length) {
        $('.js-single-card-slider').each(function () {
            var items = $(this).find('.block-slider-news__item');

            if (items.length < 2) {
                items.parents('.js-single-card-slider').find('.slick-dots').hide();
            }
        });
    }

    // head slider
    $('.js-head-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true
    });




})(jQuery, Drupal);

