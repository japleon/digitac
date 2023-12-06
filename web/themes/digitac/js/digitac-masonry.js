(function ($, Drupal) {




    // --------------------------------------
    // ----- MASONRY ------
    // --------------------------------------
    if ($(window).width() >= 768) {
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

        $('.view-id-distributivas.view-display-id-block_3 .view-content').masonry({
            itemSelector: '.block-ideas__item',
            horizontalOrder: true,
            gutter: 30
        });
    }

    $('.nav-link').on('click', function () {
        if ($(this).hasClass('nav-link-ideas')) {
            console.log('entra masonry ideas');
            $('.view-id-distributivas.view-display-id-block_1 .view-content').masonry({
                itemSelector: '.block-ideas__item',
                horizontalOrder: true,
                gutter: 30
            });
        }

        if ($(this).hasClass('nav-link-experience')) {
            console.log('entra masonry experiencias');
            $('.view-id-distributivas.view-display-id-block_3 .view-content').masonry({
                itemSelector: '.block-ideas__item',
                horizontalOrder: true,
                gutter: 30
            });
        }
    });





})(jQuery, Drupal);

