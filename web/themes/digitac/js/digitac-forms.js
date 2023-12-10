(function ($, Drupal) {


  /* Drupal.behaviors.someAbitraryKey = {
    attach: function (context, settings) {



    }
  }; */
  $(window).on('scroll', function() {
    var headerHeight = $('.header.fixed').outerHeight();

    $('.alert').css('top', headerHeight + 20);
  });

  setTimeout(function() {
    $('.alert').fadeOut();
  }, 5000);




  // --------------------------------------
  // ---- IDEA TAG -----
  // --------------------------------------
  if ($('.node--type-idea').length || $('.node--type-experiencia').length) {
    $(".headband .state").each(function () {
      var currentStateText = $(this).text().trim();

      if (currentStateText.indexOf("17") !== -1) {
        // abierta
        $(this).addClass('state-01');
        $(this).text(currentStateText.replace('17', ''));
      } else if (currentStateText.indexOf("19") !== -1) {
        // cerrada
        $(this).addClass('state-02');
        $(this).text(currentStateText.replace('19', ''));
      } else if (currentStateText.indexOf("16") !== -1) {
        // borrador
        $(this).addClass('state-03');
        $(this).text(currentStateText.replace('16', ''));
      } else if (currentStateText.indexOf("18") !== -1) {
        // evaluacion
        $(this).addClass('state-04');
        $(this).text(currentStateText.replace('18', ''));
      }
    });
  }

  function regionIdeasStates() {
    if ($('.node--type-reto').length) {
      $(".block-ideas__item .region").each(function () {
        var currentStateText = $(this).text().trim();

        if (currentStateText.indexOf("17") !== -1) {
          // abierta
          $(this).addClass('region-01');
          $(this).text(currentStateText.replace('17', ''));
        } else if (currentStateText.indexOf("19") !== -1) {
          // cerrada
          $(this).addClass('region-02');
          $(this).text(currentStateText.replace('19', ''));
        } else if (currentStateText.indexOf("16") !== -1) {
          // borrador
          $(this).addClass('region-03');
          $(this).text(currentStateText.replace('16', ''));
        } else if (currentStateText.indexOf("18") !== -1) {
          // evaluacion
          $(this).addClass('region-04');
          $(this).text(currentStateText.replace('18', ''));
        }
      });
    }
  }

  function regionStates() {
    if ($('.view-view-retos').length) {
      $(".view-view-retos .region").each(function () {
        var currentStateText = $(this).text().trim();
        if (currentStateText.indexOf("14") !== -1) {
          // abierta
          $(this).addClass('region-01');
          $(this).text(currentStateText.replace('14', ''));
        } else if (currentStateText.indexOf("15") !== -1) {
          // cerrada
          $(this).addClass('region-02');
          $(this).text(currentStateText.replace('15', ''));
        } else if (currentStateText.indexOf("13") !== -1) {
          // borrador
          $(this).addClass('region-03');
          $(this).text(currentStateText.replace('13', ''));
        }
      });
    }
  }

  $(document).ready(function () {
    regionStates();
    regionIdeasStates();
  });

  $('.nav-link').on('click', function () {
    if ($(this).hasClass('nav-link-ideas') || $(this).hasClass('nav-link-experience')) {
      regionIdeasStates();
    }
  });


  $('.pager-show-more a').on('click', function () {
    console.log('entra load');

    $(document).ajaxComplete(function () {
      regionStates();
      regionIdeasStates();
    });
  })


  // --------------------------------------
  // ---- RETOS - Distributiva - Filtro select onchange ----
  // --------------------------------------

  /* $(document).ready(function() {
    // Agrega un evento onchange al elemento select
    $('#edit-field-reto-categoria-target-id').on('change', function() {
      // Obtiene el nuevo valor seleccionado del select
      var selectedValue = $(this).val();

      // Limpia el filtro anterior
      limpiarFiltroAnterior();

      // Imita el envío del formulario para activar la recarga AJAX
      $('#views-exposed-form-view-retos-block-3').submit(function(event) {
        // Previene el comportamiento predeterminado del formulario
        event.preventDefault();
      });

      // Actualiza la URL con el nuevo valor seleccionado
      actualizarURL(selectedValue);
    });

    function limpiarFiltroAnterior() {
      // No necesitas restablecer el valor del select aquí
      // $('#edit-field-reto-categoria-target-id').val('All');
    }

    // Vincula el evento 'ajaxComplete' para manejar la recarga AJAX
    $(document).on('ajaxComplete.limpiarFiltroAnterior', function() {
      // Asegúrate de que la lógica aquí utilice correctamente el valor del select
      regionStates();
    });

    function regionStates() {
      // Implementa la lógica específica para manejar la recarga AJAX
      console.log('Recarga AJAX completada');
      // Puedes agregar lógica adicional aquí según tus necesidades
    }

    function actualizarURL(selectedValue) {
      // Obtiene la URL actual
      var currentURL = window.location.href;

      // Reemplaza completamente la URL en el navegador sin recargar la página
      window.location.replace(actualizarParametroURL(currentURL, 'field_reto_categoria_target_id', selectedValue));
    }

    function actualizarParametroURL(url, key, value) {
      var urlObj = new URL(url);
      urlObj.searchParams.set(key, value);
      return urlObj.toString();
    }
  }); */







  // --------------------------------------
  // ---- ESTADISTICAS ----
  // --------------------------------------
  if ($('input[name="daterange"]').length) {
    $(function () {
      // Obtener el valor almacenado en localStorage
      var storedDateRange = localStorage.getItem('selectedDateRange');

      // Configurar el rango de fechas con el valor almacenado o un valor predeterminado
      var initialDateRange = storedDateRange ? JSON.parse(storedDateRange) : {
        startDate: moment(),
        endDate: moment()
      };

      $('input[name="daterange"]').daterangepicker({
        opens: 'left',
        locale: {
          format: 'DD-MM-YYYY'
        },
        startDate: initialDateRange.startDate,
        endDate: initialDateRange.endDate
      }, function (start, end, label) {
        console.log("A new date selection was made: " + start.format('DD-MM-YYYY') + ' to ' + end.format('DD-MM-YYYY'));

        // Guardar el rango de fechas seleccionado en localStorage
        localStorage.setItem('selectedDateRange', JSON.stringify({
          startDate: start.format('DD-MM-YYYY'),
          endDate: end.format('DD-MM-YYYY')
        }));

        seleccion_fechas(start.format('DD-MM-YYYY'), end.format('DD-MM-YYYY'));
      });

      // Mostrar el rango de fechas inicial o el valor predeterminado en el campo de rango
      if (storedDateRange) {
        $('input[name="daterange"]').val(
          initialDateRange.startDate.format('DD-MM-YYYY') + ' to ' + initialDateRange.endDate.format('DD-MM-YYYY')
        );
      } else {
        // Si localStorage está vacío, establecer el valor predeterminado como "Selecciona fechas"
        $('input[name="daterange"]').val('Selecciona fechas');
      }
    });
  }


  // --------------------------------------
  // ---- ESTADISTICAS - GRAFICA ----
  // --------------------------------------
  if ($('.statistics:not(.actions__item)').length) {
    console.log('array paises', array_paises);

    // Crear un nuevo elemento canvas
    var canvasElement = document.createElement("canvas");
    canvasElement.id = "myDoughnutChart";
    canvasElement.width = 500;
    canvasElement.height = 300;

    // Agregar el elemento canvas al contenedor con las clases 'view-id-user_admin_people' y 'view-content'
    var container = document.querySelector('.view-id-user_admin_people .view-content');
    container.appendChild(canvasElement);

    // Obtener los datos en un formato adecuado para Chart.js
    var data = {
      labels: array_paises.map(function (elemento) {
        return elemento[1];
      }),
      datasets: [{
        data: array_paises.map(function (elemento) {
          return elemento[0];
        }),
        /* backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ] */
      }]
    };

    // Configuración del gráfico
    console.log('entra2');
    var options = {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'left'
        }
      }
    };

    // Crear el gráfico de dona en el nuevo elemento canvas
    var ctx = canvasElement.getContext('2d');
    var myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options
    });

  }


  // --------------------------------------
  // ---- COMENTARIOS - DESPLEGABLE ----
  // --------------------------------------
  $(window).on('load', function () {
    if ($('.indented').length) {
      $('.indented').before('<a class="btn-drop js-drop-comments" href="#" role="button" aria-expanded="true">Respuestas</a>');

      $('.js-drop-comments').on('click', function (e) {
        e.preventDefault();

        $(this).toggleClass('is-closed');
        $(this).siblings('.indented').slideToggle("slow");

        $(this).attr('aria-expanded', function (i, attr) {
          return attr == 'true' ? 'false' : 'true'
        });

      });
    }
  });




  // --------------------------------------
  // ---- NOTA - IDEAS ----
  // --------------------------------------
  var storageKeyPrefixMessage = 'closed-';
  var parentMessageId = null;

  $('.js-message-close').on('click', function (e) {
      e.preventDefault();

      // Obtener el ID del mensaje actual
      parentMessageId = $(this).closest('.message').attr('id');
      console.log(parentMessageId);

      console.log('Entrando en el mensaje');
      // Añadir la clase al padre
      $('#' + parentMessageId).addClass('closed');

      // Guardar la información en localStorage
      localStorage.setItem(storageKeyPrefixMessage + parentMessageId, true);
  });

  $(document).ready(function () {
      // Al cargar la página, encontrar el primer mensaje cerrado en el localStorage
      $('.message').each(function () {
          var messageId = $(this).attr('id');
          var isClosed = localStorage.getItem(storageKeyPrefixMessage + messageId);

          if (isClosed) {
              // Agregar la clase cerrada si está en el localStorage
              $('#' + messageId).addClass('closed');
          }
      });
  });



  // --------------------------------------
  // ---- RETOS - ANCLAS ----
  // --------------------------------------

  // Maneja el clic en los enlaces con anclas
  $('.js-tab-actions a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    console.log('entra tab');

    // Obtiene el nombre del tab pane desde el enlace
    var tabPaneId = this.hash.substring(1);

    // Activa el tab pane correspondiente
    $('.tab-pane').removeClass('active show');
    $('#' + tabPaneId).addClass('active show');

    // Cierra todas las pestañas
    $('.tab-actions__item').removeClass('active');

    // Activa la pestaña correspondiente
    $(this).closest('li').addClass('active');
  });

  // Maneja el cambio en el anclaje de la URL
  $(window).on('load', function () {
    if ($('.tab-pane').length) {
      var tabPaneId = window.location.hash.substring(1);

      console.log('tabPaneId', tabPaneId);

      // Activa el tab pane correspondiente
      if (tabPaneId !== '') {
        console.log('tabPaneId no esta vacio');

        if (tabPaneId.includes("comment-"))
        {tabPaneId = 'home';}

        $('.tab-pane').removeClass('active show');
        $('#' + tabPaneId).addClass('active show');

        if ($('.tab-pane-idea').hasClass('active')) {
          console.log('entra masonry ideas');
          $('.view-id-distributivas.view-display-id-block_1 .view-content').masonry({
            itemSelector: '.block-ideas__item',
            horizontalOrder: true,
            gutter: 30
          });
        }

        if ($('.tab-pane-experience').hasClass('active')) {
          console.log('entra masonry experiencias');
          $('.view-id-distributivas.view-display-id-block_3 .view-content').masonry({
            itemSelector: '.block-ideas__item',
            horizontalOrder: true,
            gutter: 30
          });
        }

        // Cierra todas las pestañas
        $('.nav-tabs-actions .nav-item button').removeClass('active');

        // Activa la pestaña correspondiente
        console.log('que es esto', $('.nav-tabs-actions .nav-item button[data-bs-target="#' + tabPaneId + '"]'));

        $('.nav-tabs-actions .nav-item button[data-bs-target="#' + tabPaneId + '"]').addClass('active');

      }

    }
  });




  // --------------------------------------
  // ---- NUEVA IDEA / EXPERIENCIA - CUSTOM CHECKBOX ----
  // --------------------------------------
  function customizeCheckbox() {
    if (!$('.box-switch').length) {
      $('.js-form-type-checkbox input').each(function () {
        var inputElement = $(this);
        var labelElement = inputElement.closest('.js-form-type-checkbox').find('label');

        // Mover el input al final del label
        labelElement.append(inputElement);

        // Agregar el span después del input
        $('<span class="checkmark"></span>').insertAfter(inputElement);
      });
    }
  }

  // Llama a la función al cargar la página
  $(document).ready(function () {
    customizeCheckbox();
  });

  // Llama a la función después de cada recarga AJAX
  $(document).ajaxComplete(function () {
    customizeCheckbox();
  });


  // --------------------------------------
  // ---- NUEVA IDEA / EXPERIENCIA - CUSTOM RADIO ----
  // --------------------------------------
  if (!$('.rating-table').length) {
    $('.js-form-type-radio input').each(function () {
      var inputElement = $(this);
      var labelElement = inputElement.closest('.js-form-type-radio').find('label');

      // Mover el input al final del label
      labelElement.append(inputElement);

      // Agregar el span después del input
      $('<span class="checkmark"></span>').insertAfter(inputElement);
    });
  }

  $('.js-form-type-radio input').each(function () {
    var radioInput = $(this);
    var radioContainer = radioInput.closest('.js-form-type-radio');

    // Verificar si el input está marcado
    if (radioInput.prop('checked')) {
      // Si está marcado, agregar la clase 'active'
      radioContainer.addClass('active');
    } else {
      // Si no está marcado, eliminar la clase 'active'
      radioContainer.removeClass('active');
    }
  });

  // Agregar un controlador de eventos para actualizar la clase cuando cambia el estado del input
  $('.js-form-type-radio input').on('change', function () {
    var radioInput = $(this);
    var radioContainer = radioInput.closest('.js-form-type-radio');

    // Eliminar la clase 'active' de todos los elementos .js-form-type-radio
    $('.js-form-type-radio').removeClass('active');

    // Verificar si el input está marcado y agregar la clase 'active' si es necesario
    if (radioInput.prop('checked')) {
      radioContainer.addClass('active');
    }
  });


  // --------------------------------------
  // ---- NUEVA IDEA / EXPERIENCIA - MOSTRAR MÁS ----
  // --------------------------------------
  $(function () {
    var elementosPorPagina = 3;

    // Muestra los primeros elementosPorPagina elementos
    $('#edit-field-idea-ideas-relacionadas .form-type-checkbox').addClass('hidden');
    $('#edit-field-idea-ideas-relacionadas .form-type-checkbox:lt(' + elementosPorPagina + ')').removeClass('hidden');

    // Obtiene el número de elementos con la clase .form-type-checkbox
    var totalElementos = $('#edit-field-idea-ideas-relacionadas .form-type-checkbox').length;

    // Crea el enlace "Mostrar más" solo si hay más de 3 elementos
    if (totalElementos > elementosPorPagina) {
      // Obtiene el número de elementos que quedan por mostrar
      var elementosRestantes = totalElementos - elementosPorPagina;

      // Crea el enlace "Mostrar más" con el número de elementos entre paréntesis
      var $toggleElementsLink = $('<a href="#" id="toggleElements" class="showmore">Mostrar más (' + elementosRestantes + ')</a>');

      // Agrega el enlace al contenedor #edit-field-idea-ideas-relacionadas--wrapper
      $('#edit-field-idea-ideas-relacionadas--wrapper').append($toggleElementsLink);

      // Maneja el enlace "Mostrar más/Mostrar menos"
      $toggleElementsLink.on('click', function (e) {
        e.preventDefault();

        // Muestra u oculta los elementos ocultos
        $('#edit-field-idea-ideas-relacionadas .form-type-checkbox:gt(' + (elementosPorPagina - 1) + ')').toggleClass('hidden');

        // Actualiza el número de elementos que quedan por mostrar
        elementosRestantes = $('#edit-field-idea-ideas-relacionadas .form-type-checkbox.hidden').length;

        // Cambia el texto del enlace con el número de elementos restantes
        var newText = ($('#edit-field-idea-ideas-relacionadas .form-type-checkbox:gt(' + (elementosPorPagina - 1) + ')').hasClass('hidden')) ? 'Mostrar más (' + elementosRestantes + ')' : 'Mostrar menos';
        $toggleElementsLink.text(newText);

        // Agrega o quita la clase "active" al enlace
        $toggleElementsLink.toggleClass('active');
      });
    }
  });




  // --------------------------------------
  // ---- SOLUCIONES - CAPACITACION FILTERS ----
  // --------------------------------------

  //open filters
  $('.js-filters').on('click', function (e) {
    e.preventDefault();

    $('.view-filters').addClass('active');
    $('body').addClass('overflow');
    $('.header').css('position', 'relative');
  });

  // close filters
  $('.js-close-filters').on('click', function (e) {
    e.preventDefault();

    $('.view-filters').removeClass('active');
    $('body').removeClass('overflow');
    $('.header').css('position', 'sticky');
  });



  // --------------------------------------
  // ---- SOLUCIONES / CAPACITACIÓN - Filtros con etiquetas ----
  // --------------------------------------


  // Agrega un controlador de clic para el botón js-remove-filters
  $(document).on('click', '.js-remove-filters', function (e) {
    e.preventDefault();

    console.log('Desmarcar checkboxes');

    // Desmarca todos los checkboxes dentro de la clase .view-filters
    $('.view-filters input[type="checkbox"]').prop('checked', false);

    // Dispara el evento de cambio en los checkboxes
    $('.view-filters input[type="checkbox"]').trigger('change');

    // Oculta .filter-tags ya que no hay etiquetas
    $('.filter-tags').addClass('hidden');
  });

  // --------------------

  // Función para agregar una etiqueta
  function agregarEtiqueta(label) {
    var tag = $('<div class="tag">' + label + '<a href="#" class="remove-tag">x</a></div>');
    $('.filter-tags__content').prepend(tag);

    // Muestra .filter-tags si estaba oculto
    $('.filter-tags').removeClass('hidden');
  }

  // Controlador de clic para quitar etiquetas y simular clic en el filtro asociado
  $(document).on('click', '.filter-tags__content .remove-tag', function (e) {
    e.preventDefault();
    var tag = $(this).closest('.tag');
    var tagText = tag.text().trim().slice(0, -1);
    console.log('tagText:', tagText);

    // Buscar el label asociado a la etiqueta
    var label = $('.view-filters label:contains("' + tagText + '")');

    // Verificar si se encontró el label
    if (label.length > 0) {
      // Obtener el atributo "for" del label para encontrar el id del checkbox asociado
      var checkboxId = label.attr('for');

      // Verificar si se encontró el id del checkbox
      if (checkboxId) {
        // Seleccionar el checkbox por su id y simular el clic en el filtro asociado
        $('#' + checkboxId).prop('checked', false).trigger('change');
      }
    }

    // Elimina la etiqueta
    tag.remove();

    // Verifica si aún hay etiquetas dentro de .filter-tags__content
    if ($('.filter-tags__content .tag').length === 0) {
      // Oculta .filter-tags si no hay etiquetas
      $('.filter-tags').addClass('hidden');
    }
  });




  // Espera a que termine la recarga AJAX
  $(document).ajaxComplete(function (event, xhr, settings) {
    // Verifica si la recarga AJAX proviene de la vista específica que estás controlando
    if (settings.url.indexOf('/views/ajax') !== -1) {
      console.log('Recarga AJAX completada');

      // Vuelve a agregar las etiquetas después de la recarga AJAX
      $('.view-filters input[type="checkbox"]:checked').each(function () {
        var label = $(this).closest('label').text().trim();
        agregarEtiqueta(label);

        // mob
        $('.view-filters').removeClass('active');
        $('body').removeClass('overflow');
        $('.header').css('position', 'sticky');
      });
    }

    // mob
    $('.js-filters').on('click', function (e) {
      e.preventDefault();

      $('.view-filters').addClass('active');
      $('body').addClass('overflow');
      $('.header').css('position', 'relative');
    });
  });


  // Función para contar y actualizar el número de cursos
  function actualizarNumeroCursos() {
    var numeroCursos = $('.courses__item').length;
    $('.js-count-filters span').text(numeroCursos);
  }

  // Contar y actualizar al cargar la página
  $(document).ready(function () {
    actualizarNumeroCursos();
  });

  // Evento para manejar recargas AJAX (ejemplo)
  $(document).on('ajaxComplete', function () {
    // Suponiendo que la recarga AJAX afecta a los elementos .courses__item
    // Puedes adaptar esto según cómo esté implementado en tu aplicación
    actualizarNumeroCursos();
  });


  // --------------------------------------
  // ---- CLONE BALL IN TO COMMENT FORM ----
  // --------------------------------------

  $(document).ready(function () {
    // Función que se ejecutará cuando se inserte un nuevo nodo en el DOM
    function onNodeInserted(event) {
      var targetElement = $(event.target);

      // Verificar si el nuevo nodo pertenece a .box-grey .comment-comment-form
      if (targetElement.is(".box-grey .comment-comment-form")) {
        var estructuraClonada = $(".header .user-ball").clone();
        console.log('estructuraClonada', estructuraClonada);
        targetElement.prepend(estructuraClonada);

        console.log('Contenido de .comment-comment-form:', targetElement.html());
      }
    }

    // Suscribir la función al evento DOMNodeInserted
    $(document).on('DOMNodeInserted', onNodeInserted);
  });


  // --------------------------------------
  // ---- RESPONDER COMENTARIOS FORM ----
  // --------------------------------------

  $(document).ready(function () {
    console.log('esta ready');
    $('.reply-button').on('click', function (e) {
      e.preventDefault();

      $(this).closest('.js-comment').find('.comment-form').slideToggle();

    });
  });


  // --------------------------------------
  // ---- EDIT USER FORM ----
  // --------------------------------------

  $(document).ready(function () {
    $('.block-formblock-user-edit .user-form .box-grey').append($('#edit-submit'));

  });


  // --------------------------------------
  // ---- INPUT FILE - FILE ----
  // --------------------------------------

  // Pte de mejoras de js

  // Agrega una variable global para verificar si la función ya se ejecutó
  var customInputFileExecuted = false;

  function createFileWidgetData() {
    // Crea el contenedor .file-widget-data si no existe
    if ($('.file-widget-data').length === 0) {
      $('.form-managed-file:not(.image-widget)').each(function () {
        var fileWidgetData = $('<div class="file-widget-data"></div>');

        // Mueve tanto el input como el .file a fileWidgetData
        $(this).find('input, .file').appendTo(fileWidgetData);

        // Agrega fileWidgetData al contenedor
        $(this).append(fileWidgetData);

        // Comprueba si el archivo está presente y agrega la clase 'remove' si es necesario
        if ($(this).find('.file').length > 0) {
          console.log('El archivo está presente dentro de form-managed-file');
          fileWidgetData.addClass('remove');
        } else {
          console.log('El archivo NO está presente dentro de form-managed-file');
        }
      });
    }
  }

  function movePDFFile() {
    // Mueve .file--mime-application-pdf a fileWidgetData solo si no está presente
    if ($('.file-widget-data .file--mime-application-pdf').length === 0) {
      $('.file--mime-application-pdf').appendTo('.file-widget-data');
    }
  }

  $(document).ready(function () {
    // Crea el contenedor .file-widget-data
    createFileWidgetData();

    // Mueve .file--mime-application-pdf a fileWidgetData si no está presente
    movePDFFile();

    if ($('.file-widget-data').length) {
      // Verifica si no tiene la clase 'remove'
      if (!$('.file-widget-data').hasClass('remove')) {
        // Verifica si contiene el elemento .file
        if ($('.file-widget-data .file').length > 0) {
          // Agrega la clase 'remove' y mueve tanto el input como el .file
          var fileWidgetData = $('.file-widget-data');
          fileWidgetData.addClass('remove');
          fileWidgetData.prepend(fileWidgetData.find('input, .file'));
        }
      } else {
        // Verifica si el .file no está presente dentro de .file-widget-data después de un breve retraso
        setTimeout(function () {
          if ($('.file-widget-data .file').length === 0) {
            // Elimina la clase 'remove' si .file no está presente
            $('.file-widget-data').removeClass('remove');
          }
        }, 500); // Ajusta el tiempo de espera según sea necesario
      }
    }
  });

  // Mueve .file--mime-application-pdf a fileWidgetData al hacer clic en .file-widget-data .form-submit
  $(document).on('click', '.file-widget-data .form-submit', function () {
    movePDFFile();
  });

  $(document).ajaxComplete(function () {
    // Crea el contenedor .file-widget-data
    createFileWidgetData();

    // Mueve .file--mime-application-pdf a fileWidgetData después de una solicitud AJAX si no está presente
    movePDFFile();

    if (!$('.file').length) {
      $('.file-widget-data').removeClass('remove');
    }
  });




})(jQuery, Drupal);

