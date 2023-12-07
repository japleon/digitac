(function ($, Drupal) {

  jQuery(document).ready(function ($) {

    function init() {
      // burger
      openMenu();
      closeMenu();

      // fix
      headerFixScroll();

      // selectBox
      $('.selectBox ul').addClass('account-lang');

      if ($(window).width() >= 1280) {
        selectBox();
      }
    }

    // --------------------------------------
    // menu burguer
    // --------------------------------------

    function openMenu() {
      $('.js-open-menu').on('click', function (e) {
        e.preventDefault();

        $('body').addClass('overflow');
        $('.header__nav').addClass('active');
        $('.header').addClass('active');

      });
    }

    function closeMenu() {
      $('.js-close-menu').on('click', function (e) {
        e.preventDefault();

        $('body').removeClass('overflow');

        $('.header__nav').removeClass('active');
        $('.header').removeClass('active');
      });
    }

    // --------------------------------------
    // header scroll
    // --------------------------------------

    function headerFixScroll() {
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
    }






    // --------------------------------------
    // SELECTBOX
    // --------------------------------------

    function selectBox() {
      $(".selectBox__value a").on("click", function (e) {
        e.preventDefault();

        $(this).parents('.selectBox').toggleClass("show");
      });

      $('.selectBox .dropdown-item').on('click', function (e) {
        e.preventDefault();
        var dropdownItem = $(this);
        var dropdownItemData = dropdownItem.attr('data-title');
        var container = $(".selectBox__value");

        if ($('.statistics').length) {
          var container = $(".selectBox__value a");
        }

        console.log('dropdownItem', dropdownItem);
        console.log('dropdownItemData', dropdownItemData);

        $(this).closest('.selectBox').find(container).text(dropdownItemData);

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






    init();
  });

})(jQuery, Drupal);

