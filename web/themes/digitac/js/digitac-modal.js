(function ($, Drupal) {



    // --------------------------------------
    // ---- COMENTARIOS - MODAL ----
    // -------------------------------------

    $(document).ready(function() {
        $('a[data-bs-toggle="modal"]').on('click', function(e) {
            e.preventDefault();
            $('.wrap').removeClass('push');
            $('.header.fixed').css('position', 'relative');
        });

        $(".modal").on("hidden.bs.modal", function () {
            $('.wrap').addClass('push');
            $('.header.fixed').css('position', 'fixed');
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

