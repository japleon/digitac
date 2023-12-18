(function ($, Drupal) {

  jQuery(document).ready(function ($) {

    function init() {
      if ($(window).width() >= 768) {
        // masonry
        //masonryViewsNews();
        //masonryViews();
        masonryViewsIdeas();
        masonryViewsExperiences();
      }

      tabPaneNav();
    }


    // --------------------------------------
    // ----- MASONRY ------
    // --------------------------------------
    function masonryViewsNews() {
      $('.view-id-view_noticias.view-display-id-block_3 .view-content').masonry({
        itemSelector: '.block-slider-news__item',
        horizontalOrder: true,
        gutter: 30
      });
    }

    function masonryViews() {
      console.log('entra masonry views');
      $('.view-id-view_retos.view-display-id-block_3 .view-content').masonry({
        itemSelector: '.block-slider-news__item',
        horizontalOrder: true,
        gutter: 30
      });
    }

    function masonryViewsIdeas() {
      $('.view-id-distributivas.view-display-id-block_1 .view-content').masonry({
        itemSelector: '.block-ideas__item',
        horizontalOrder: true,
        gutter: 30
      });
    }

    function masonryViewsExperiences() {
      $('.view-id-distributivas.view-display-id-block_3 .view-content').masonry({
        itemSelector: '.block-ideas__item',
        horizontalOrder: true,
        gutter: 30
      });
    }

    function tabPaneNav() {
      $('.nav-link').on('click', function () {
        if ($(this).hasClass('nav-link-ideas')) {
          masonryViewsIdeas();
        }

        if ($(this).hasClass('nav-link-experience')) {
          masonryViewsExperiences();
        }
      });
    }


    $('.pager-show-more a').on('click', function() {
      $(document).ajaxComplete(function () {

        console.log('recarga masonry');

        $('.view-id-view_noticias.view-display-id-block_3 .view-content').masonry('reloadItems');
        $('.view-id-view_retos.view-display-id-block_3 .view-content').masonry('reloadItems');
        $('.view-id-distributivas.view-display-id-block_1 .view-content').masonry('reloadItems');
        $('.view-id-distributivas.view-display-id-block_3 .view-content').masonry('reloadItems');

        // masonry
        //masonryViewsNews();
       // masonryViews();
        masonryViewsIdeas();
        masonryViewsExperiences();
      });
    });



    /* $('.view-id-view_retos.view-display-id-block_3 .view-filters .form-submit').on('click', function () {
      $(document).ajaxComplete(function () {
        masonryViews();

        if (window.location.href.indexOf('field_reto_categoria_target_id=All') > -1) {
          console.log('encuentra parametro');

          $('.pager-show-more a').on('click', function() {

            $(document).ajaxComplete(function () {
              $('.view-id-view_retos.view-display-id-block_3 .view-content').masonry('reloadItems');

              masonryViews();
            });

          });
        }


      });
    });
 */


    // ideas - experiences

    $('.view-id-distributivas.view-display-id-block_1 .view-filters .form-submit').on('click', function () {
      $(document).ajaxComplete(function () {

        $('.view-id-distributivas.view-display-id-block_1 .view-content').masonry('reloadItems');
        masonryViewsIdeas();

      });
    });

    $('.view-id-distributivas.view-display-id-block_3 .view-filters .form-submit').on('click', function () {
      $(document).ajaxComplete(function () {

        $('.view-id-distributivas.view-display-id-block_3 .view-content').masonry('reloadItems');
        masonryViewsExperiences();

      });
    });



    init();
  });

})(jQuery, Drupal);

