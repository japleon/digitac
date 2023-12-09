(function ($, Drupal) {



    // --------------------------------------
    // ---- COMENTARIOS - MODAL ----
    // -------------------------------------

    $(document).ready(function() {
        $('a[data-bs-toggle="modal"]').on('click', function(e) {
            e.preventDefault();


            if($('.header.fixed').length) {
                $('.wrap').removeClass('push');
                $('.header.fixed').addClass('relative');
            } else {
                $('.header').addClass('layer');
            }
        });

        $(".modal").on("hidden.bs.modal", function () {
            if($('.header.fixed').length) {
                $('.wrap').addClass('push');
                $('.header.fixed').removeClass('relative');
            } else {
                $('.header').removeClass('layer');
            }
        });
    });


    // enlaces dentro de modal que van a su propia url
    // sustituir 'a' por la clase de los enlaces que queremos que vayan  a su url
    // ejemplo '.url-link'
    $('.modal').on('click', 'a', function (e) {
        // Evita que el enlace haga su acción predeterminada (navegar a otra página)
        e.preventDefault();

        console.log('entra click');

        // Obtén la URL del atributo 'href' del enlace clicado
        var url = $(this).attr('href');

        // Puedes hacer algo más antes de redirigir, si es necesario

        // Redirige a la URL
        window.location.href = url;
    });





})(jQuery, Drupal);

