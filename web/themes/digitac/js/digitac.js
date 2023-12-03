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
  $(function(){
    $(window).scroll(function(){
      var headerHeight = $('.header').height();
      if($(this).scrollTop() >= headerHeight){
        $('.header').addClass('fixed');
        if($('body:not(.path-frontpage)').length) {
          $('.wrap').addClass('push');
        }
      } else {
        $('.header').removeClass('fixed');

        if($('body:not(.path-frontpage)').length) {
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

  if($(window).width() >= 1280) {
    $(".selectBox__value a").on("click", function(e) {
      $(this).parents('.selectBox').toggleClass("show");
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

    $(document).on("mousedown touchstart",function(e){
      var $info = $('.selectBox');
      if (!$info.is(e.target) && $info.has(e.target).length === 0) {
        $info.removeClass('show');
      }
    });
  }



  // --------------------------------------
  // ----- SLIDERS ------
  // --------------------------------------

  // svg slider
  if($(window).width() >= 768) {
    $('#training-carousel').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  // card type slider
  $('.js-card-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  if($('.js-card-slider').length) {
    if($(window).width() <= 480) {
      console.log('menor de 480');
      $('.js-card-slider').each(function() {
        var items = $(this).find('.block-slider-news__item');

        if (items.length < 2) {
          console.log('menor de 2');
          items.parents('.js-card-slider').find('.slick-dots').hide();
        }
      });
    } else if($(window).width() >= 480 && $(window).width() < 1024) {
      console.log('estoy por debajo de 1024');
      $('.js-card-slider').each(function() {
        var items = $(this).find('.block-slider-news__item');

        if (items.length < 3) {
          console.log('menor de 2');
          items.parents('.js-card-slider').find('.slick-dots').hide();
        }
      });
    } else if($(window).width() >= 1024) {
      console.log('estoy por encima de 1024');
      $('.js-card-slider').each(function() {
        var items = $(this).find('.block-slider-news__item');

        if (items.length < 4) {
            items.parents('.js-card-slider').find('.slick-dots').hide();
        }
      });

    }
  }

  // horizontal card / single card
  $('.js-single-card-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true
  });

  if($('.js-single-card-slider').length) {
    $('.js-single-card-slider').each(function() {
      var items = $(this).find('.block-slider-news__item');

      if (items.length < 2) {
          items.parents('.js-single-card-slider').find('.slick-dots').hide();
      }
    });
  }

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


  // --------------------------------------
  // ----- MASONRY ------
  // --------------------------------------
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

    $('.view-id-distributivas.view-display-id-block_3 .view-content').masonry({
      itemSelector: '.block-ideas__item',
      horizontalOrder: true,
      gutter: 30
    });
  }

  $('.nav-link').on('click', function() {
    if($(this).hasClass('nav-link-ideas')) {
      console.log('entra masonry ideas');
      $('.view-id-distributivas.view-display-id-block_1 .view-content').masonry({
        itemSelector: '.block-ideas__item',
        horizontalOrder: true,
        gutter: 30
      });
    }

    if($(this).hasClass('nav-link-experience')) {
      console.log('entra masonry experiencias');
      $('.view-id-distributivas.view-display-id-block_3 .view-content').masonry({
        itemSelector: '.block-ideas__item',
        horizontalOrder: true,
        gutter: 30
      });
    }
  })


  // --------------------------------------
  // ---- IDEA TAG -----
  // --------------------------------------
  if ($('.node--type-idea').length || $('.node--type-experiencia').length) {
    $(".headband .state").each(function() {
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

  if ($('.node--type-reto').length) {
    $(".block-ideas__item .region").each(function() {
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

  function regionStates () {
    if ($('.view-view-retos').length) {
      $(".view-view-retos .region").each(function() {
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

  $(document).ready(function() {
    regionStates();
  });


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
  // ---- SOLUCIONES - CAPACITACION FILTERS ----
  // --------------------------------------

  //open filters
  $('.js-filters').on('click', function(e){
    e.preventDefault();

    $('.view-filters').addClass('active');
    $('body').addClass('overflow');
    $('.header').css('position', 'relative');
  });

  // close filters
  $('.js-close-filters').on('click', function(e){
    e.preventDefault();

    $('.view-filters').removeClass('active');
    $('body').removeClass('overflow');
    $('.header').css('position', 'sticky');
  });


  // --------------------------------------
  // ---- ESTADISTICAS ----
  // --------------------------------------
  if($('input[name="daterange"]').length) {
    $(function() {
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
      }, function(start, end, label) {
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
  if($('.statistics:not(.actions__item)').length) {
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
      labels: array_paises.map(function(elemento) {
        return elemento[1];
      }),
      datasets: [{
        data: array_paises.map(function(elemento) {
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
  $(window).on('load', function() {
    if($('.indented').length) {
      $('.indented').before('<a class="btn-drop js-drop-comments" href="#" role="button" aria-expanded="true">Respuestas</a>');

      $('.js-drop-comments').on('click', function(e) {
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
  // ---- COMENTARIOS - DESPLEGABLE ----
  // --------------------------------------

  $(".modal").on("shown.bs.modal", function () {
    if ($(".modal-backdrop").length > 1) {
      $(".modal-backdrop").not(':first').remove();
    }
    $(this).insertAfter('.modal-backdrop');
  });

  $('a[data-bs-toggle="modal"]').on('click', function() {
    $('.modal-backdrop').prependTo($(this));
  });





  // --------------------------------------
  // ---- NOTA - IDEAS ----
  // --------------------------------------
  $('.js-message-close').on('click', function(e) {
    e.preventDefault(); // Evita la navegación predeterminada

    // Obtiene el ID del padre desde el atributo data-parent-id
    var parentId = $(this).parent().attr('id');
    console.log(parentId);

    // Añade la clase al padre
   $('#' + parentId).addClass('closed');

    // Guarda la información en localStorage
    localStorage.setItem('closedMessageIdea', parentId);
  });

  // Comprueba si hay información en localStorage al cargar la página
  var selectedItem = localStorage.getItem('closedMessageIdea');
  if (selectedItem) {
      $('#' + selectedItem).addClass('closed');
  }


  // --------------------------------------
  // ---- RETOS - ANCLAS ----
  // --------------------------------------

  // Maneja el clic en los enlaces con anclas
  $('.js-tab-actions a[href^="#"]').on('click', function(e) {
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
  $(window).on('load', function() {
    if($('.tab-pane').length) {
      var tabPaneId = window.location.hash.substring(1);

      console.log('tabPaneId', tabPaneId);

      // Activa el tab pane correspondiente
      if(tabPaneId !== '') {
        console.log('tabPaneId no esta vacio');
        $('.tab-pane').removeClass('active show');
        $('#' + tabPaneId).addClass('active show');

        if($('.tab-pane-idea').hasClass('active')) {
          console.log('entra masonry ideas');
          $('.view-id-distributivas.view-display-id-block_1 .view-content').masonry({
            itemSelector: '.block-ideas__item',
            horizontalOrder: true,
            gutter: 30
          });
        }

        if($('.tab-pane-experience').hasClass('active')) {
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
        console.log('que es esto', $('.nav-tabs-actions .nav-item button[data-bs-target="#' + tabPaneId +'"]'));

        $('.nav-tabs-actions .nav-item button[data-bs-target="#' + tabPaneId +'"]').addClass('active');

      }

    }
  });




  // --------------------------------------
  // ---- NUEVA IDEA / EXPERIENCIA - CUSTOM CHECKBOX ----
  // --------------------------------------
  function customizeCheckbox() {
    if (!$('.box-switch').length) {
      $('.js-form-type-checkbox input').each(function() {
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
  $(document).ready(function() {
    customizeCheckbox();
  });

  // Llama a la función después de cada recarga AJAX
  $(document).ajaxComplete(function() {
    customizeCheckbox();
  });


  // --------------------------------------
  // ---- NUEVA IDEA / EXPERIENCIA - CUSTOM RADIO ----
  // --------------------------------------
  if(!$('.rating-table').length) {
    $('.js-form-type-radio input').each(function() {
      var inputElement = $(this);
      var labelElement = inputElement.closest('.js-form-type-radio').find('label');

      // Mover el input al final del label
      labelElement.append(inputElement);

      // Agregar el span después del input
      $('<span class="checkmark"></span>').insertAfter(inputElement);
    });
  }

  $('.js-form-type-radio input').each(function() {
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
  $('.js-form-type-radio input').on('change', function() {
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
  // ---- SOLUCIONES / CAPACITACIÓN - Filtros con etiquetas ----
  // --------------------------------------


  // Agrega un controlador de clic para el botón js-remove-filters
  $(document).on('click', '.js-remove-filters', function(e) {
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
      });
    }
  });


  // Función para contar y actualizar el número de cursos
  function actualizarNumeroCursos() {
    var numeroCursos = $('.courses__item').length;
    $('.js-count-filters span').text(numeroCursos);
  }

  // Contar y actualizar al cargar la página
  $(document).ready(function() {
    actualizarNumeroCursos();
  });

  // Evento para manejar recargas AJAX (ejemplo)
  $(document).on('ajaxComplete', function() {
    // Suponiendo que la recarga AJAX afecta a los elementos .courses__item
    // Puedes adaptar esto según cómo esté implementado en tu aplicación
    actualizarNumeroCursos();
  });






})(jQuery, Drupal);

