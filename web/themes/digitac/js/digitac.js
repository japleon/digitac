(function ($, Drupal) {


  /* Drupal.behaviors.someAbitraryKey = {
    attach: function (context, settings) {

      jQuery('input:radio').change(function () {
        jQuery(".poll-view-form").submit();
      });

      jQuery(".poll-view-form").submit(function (e) {

        e.preventDefault();
        var form = jQuery(this);
        var actionUrl = form.attr('action');
        jQuery.ajax({
          type: "POST",
          url: actionUrl,
          data: form.serialize(),
          success: function (data) {
            jQuery('.post__poll').html(Drupal.t('Your vote has been registered.'));
          },
          error: function (data) {
            jQuery('.post__poll').html(Drupal.t('There has been an error processing your vote. Try later.'));
          }
        });
      });


      jQuery('.js-example-basic-single').on('select2:select', function (e) {
        var data = e.params.data;
        window.location.href = "/ideasfordemocracy/"+jQuery('.js-example-basic-single').attr('data-lang')+'/tag/'+data.id;
      });

    }
  }; */

  // menu burguer
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
  $(function(){
    $(window).scroll(function(){
      var headerHeight = $('.header').height();
      if($(this).scrollTop() >= headerHeight){
        $('.header').addClass('fixed');
      } else {
        $('.header').removeClass('fixed');
      }
    });
  });


  // SELECTBOX
  $(".selectBox").on("click", function(e) {
    $(this).toggleClass("show");
  });


  $('.selectBox .dropdown-item').on('click', function(e) {
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




  // ----- SLIDERS ------
  // svg slider
  $('#training-carousel').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: true
  });

  // card type slider
  $('.js-card-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true
  });

  // horizontal card / single card
  $('.js-single-card-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true
  });



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


  // ----- MASONRY ------
  if($(window).width() >= 768 ) {
    $('.view-id-view_noticias.view-display-id-block_3 .view-content').masonry({
      itemSelector: '.block-slider-news__item',
      horizontalOrder: true,
      gutter: 30
    });

    $('.view-id-view_retos.view-display-id-block_3 .view-content').masonry({
      itemSelector: '.block-slider-news__item',
      horizontalOrder: true,
      gutter: 30
    });

    $('.view-id-distributivas.view-display-id-block_1 .view-content').masonry({
      itemSelector: '.block-ideas__item',
      horizontalOrder: true,
      gutter: 30
    });
  }



})(jQuery, Drupal);

