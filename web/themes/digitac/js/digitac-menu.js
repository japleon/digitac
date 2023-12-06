(function ($, Drupal) {



    // --------------------------------------
    // menu burguer
    // --------------------------------------

    $('.js-open-menu').on('click', function (e) {
        e.preventDefault();

        $('body').addClass('overflow');
        $('.header__nav').addClass('active');

    });

    $('.js-close-menu').on('click', function (e) {
        e.preventDefault();

        $('body').removeClass('overflow');

        $('.header__nav').removeClass('active');
    });


    // header
    $(function () {
        $(window).scroll(function () {
            var headerHeight = $('.header').height();
            if ($(this).scrollTop() >= headerHeight) {
                $('.header').addClass('fixed');
                if ($('body:not(.path-frontpage)').length) {
                    $('.wrap').addClass('push');
                }
            } else {
                $('.header').removeClass('fixed');

                if ($('body:not(.path-frontpage)').length) {
                    $('.wrap').removeClass('push');
                }
            }
        });
    });


    // menu burguer
    $('.js-open-menu').on('click', function (e) {
        e.preventDefault();

        $('body').addClass('overflow');
        $('.header').addClass('active');

    });

    $('.js-close-menu').on('click', function (e) {
        e.preventDefault();

        $('body').removeClass('overflow');

        $('.header').removeClass('active');
    });


    // --------------------------------------
    // SELECTBOX
    // --------------------------------------
    $('.selectBox ul').addClass('account-lang');

    if ($(window).width() >= 1280) {
        $(".selectBox__value a").on("click", function (e) {
            $(this).parents('.selectBox').toggleClass("show");
        });

        $('.selectBox .dropdown-item').on('click', function (e) {
            e.preventDefault();
            var dropdownItem = $(this);
            var dropdownItemData = dropdownItem.attr('data-title');
            var container = $(".selectBox__value");

            console.log('dropdownItem', dropdownItem);
            console.log('dropdownItemData', dropdownItemData);

            container.text(dropdownItemData);
            $(dropdownItem)
                .addClass("active")
                .siblings()
                .removeClass("active");
        });

        $(document).on("mousedown touchstart", function (e) {
            var $info = $('.selectBox');
            if (!$info.is(e.target) && $info.has(e.target).length === 0) {
                $info.removeClass('show');
            }
        });
    }



})(jQuery, Drupal);

