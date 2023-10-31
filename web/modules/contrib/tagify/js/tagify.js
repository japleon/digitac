(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.tagifyAutocomplete = {
    attach: function attach(context, settings) {
      // see https://github.com/yairEO/tagify#ajax-whitelist
      var elements = $(once('tagify-widget', 'input.tagify-widget', context));

      elements.each(function (e) {
        // @todo create a setting form in Drupal to have an editable option.
        var input = this,
          tagify = new Tagify(input, {
            dropdown: {
              enabled: parseInt(input.dataset.suggestionsDropdown),
              highlightFirst: true,
              fuzzySearch: false,
              maxItems: input.dataset.maxItems ?? Infinity,
              closeOnSelect : true,
            },
            whitelist: [],
            placeholder: parseInt(input.dataset.placeholder),
          }),
          controller;

        // Avoid creating tag when 'Create referenced entities if they don't already exist' is disallowed.
        tagify.settings.enforceWhitelist = !$(this).hasClass("tagify--autocreate");
        tagify.settings.skipInvalid = !!$(this).hasClass("tagify--autocreate");
        // Avoid creating tag when the cardinality is 0.
        tagify.settings.maxTags = $(this).hasClass("tagify--limited") ? 1 : Infinity;

        // Bind "DragSort" to Tagify's main element and tell
        // it that all the items with the below "selector" are "draggable".
        new DragSort(tagify.DOM.scope, {
          selector: '.' + tagify.settings.classNames.tag,
          callbacks: {
            dragEnd: onDragEnd
          }
        });

        // Must update Tagify's value according to the re-ordered nodes in the DOM.
        function onDragEnd(e){
          tagify.updateValueByDOMTags()
        }

        function handleAutocomplete(value){
          tagify.whitelist = null;
          // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
          controller && controller.abort();
          controller = new AbortController();
          // Show loading animation meanwhile the dropdown suggestions are hided.
          value !== '' ? tagify.loading(true) : tagify.loading(false);
          fetch($(input).attr('data-autocomplete-url') + '?q=' + encodeURIComponent(value), {signal: controller.signal})
            .then(res => res.json())
            .then(function (newWhitelist) {
              var newWhitelistData = [];
              newWhitelist.forEach(function (current) {
                newWhitelistData.push({
                  value: current.label,
                  entity_id: current.entity_id,
                  ...current.attributes
                });
              });
              // build the whitelist with the values coming from the fetch
              tagify.whitelist = newWhitelistData; // update whitelist Array in-place
              tagify.loading(false).dropdown.show(value) // render the suggestions dropdown
            });
        }

        // onInput event.
        var onInput = Drupal.debounce(function (e) {
          var value = e.detail.value;
          handleAutocomplete(value);
        }, 500);

        // onEditInput event.
        var onEditInput = Drupal.debounce(function (e) {
          var value = e.detail.data.newValue;
          handleAutocomplete(value);
        }, 500);

        // onFocusInput event.
        var onFocusInput = Drupal.debounce(function (e) {
          handleAutocomplete('');
        }, 500);

        // Edit input event (When user is editing the tag).
        tagify.on('edit:input', onEditInput)
        // Input event (When user is creating the tag).
        tagify.on('input', onInput)
        // Focus input event (When user interacts with the field).
        tagify.on('focus', onFocusInput)
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
