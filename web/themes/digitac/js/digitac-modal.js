(function ($, Drupal) {



    // --------------------------------------
    // ---- COMENTARIOS - MODAL ----
    // --------------------------------------

    $(".modal").on("shown.bs.modal", function (e) {
        var modal = $(this);

        if ($(".modal-backdrop").length > 1) {
            $(".modal-backdrop").not(':first').remove();
        }

        modal.insertAfter('.modal-backdrop');
        setTimeout(function () {
            $(".modal-backdrop").addClass("show");

        }, 300);

    });

    $('a[data-bs-toggle="modal"]').on('click', function () {
        $('.modal-backdrop').prependTo($(this));
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

