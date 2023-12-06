(function ($, Drupal) {



    // --------------------------------------
    // ---- ALIADOS TAB ----
    // --------------------------------------
    if ($('.js-aliados-tab .tab-actions__item a').hasClass('active')) {
        $('.js-aliados-tab .tab-actions__item a.active').parent().addClass('active');
    }
    $('.js-aliados-tab .tab-actions__item a').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var tabActionItemId = $(this).attr('id');

        console.log('tabActionItemId', tabActionItemId);

        $('.js-aliados-tab .tab-actions__item').removeClass('active');
        $('.js-aliados-tab .tab-actions__item a').removeClass('active');

        $(this).addClass('active');
        $(this).parent().addClass('active');

        $('.tab-pane').removeClass('show');
        $('.paragraph').find('#' + tabActionItemId).addClass('show');

    });



})(jQuery, Drupal);

