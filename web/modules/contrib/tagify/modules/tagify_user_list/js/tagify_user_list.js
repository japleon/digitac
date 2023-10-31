(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.tagifyAutocompleteUserList = {
    attach: function attach(context, settings) {
      // see https://github.com/yairEO/tagify#ajax-whitelist
      var inputSelector = $(once('tagify-user-list-widget', 'input.tagify-user-list-widget'));

      inputSelector.each(function (e) {

        function tagTemplate(tagData){
          return `
          <tag title="${tagData.email}"
                  contenteditable='false'
                  spellcheck='false'
                  tabIndex="-1"
                  class="tagify__tag ${tagData.class ? tagData.class : ""}"
                  ${this.getAttributes(tagData)}>
              <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
              <div>
                  <div class='tagify__tag__avatar-wrap'>
                      <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
                  </div>
                  <span class='tagify__tag-text'>${tagData.value}</span>
              </div>
          </tag>
        `
        }

        function suggestionItemTemplate(tagData){
          return `
          <div ${this.getAttributes(tagData)}
              class='tagify__dropdown__item ${tagData.class ? tagData.class : ""}'
              tabindex="0"
              role="option">
              ${ tagData.avatar ? `
                  <div class='tagify__dropdown__item__avatar-wrap'>
                      <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
                  </div>` : ''
          }
              <strong>${tagData.value}</strong>
              <span>${tagData.email}</span>
          </div>
        `
        }

        function dropdownHeaderTemplate(suggestions){
          return `
          <header data-selector='tagify-suggestions-header' class="${this.settings.classNames.dropdownItem} ${this.settings.classNames.dropdownItem}__addAll">
              <span>${suggestions.length} members</span>
          </header>
        `
        }

        // @todo create a setting form in Drupal to have an editable option.
        var input = this,
          tagify = new Tagify(input, {
            dropdown: {
              enabled: 1,
              highlightFirst: true,
              fuzzySearch: false,
              classname: 'users-list',
              maxItems: input.dataset.maxItems ?? 10,
            },
            templates: {
              tag: tagTemplate,
              dropdownItem: suggestionItemTemplate,
              dropdownHeader: dropdownHeaderTemplate
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
          tagify.loading(true);
          value !== '' ? tagify.loading(true) : tagify.loading(false);
          fetch($(input).attr('data-autocomplete-url') + '?q=' + encodeURIComponent(value), {signal: controller.signal})
            .then(res => res.json())
            .then(function (newWhitelist) {
              var newWhitelistData = [];
              newWhitelist.forEach(function (current) {
                newWhitelistData.push({
                  value: current.label,
                  entity_id: current.entity_id,
                  avatar: current.avatar,
                  email: current.email,
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
          var value = '';
          handleAutocomplete(value);
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

  Drupal.behaviors.nodeDetailsSummaries = {
    attach: function attach(context) {
      var $context = $(context);
      $context.find('.node-form-author').drupalSetSummary(function (context) {
        var $authorContext = $(context);
        var name = $authorContext.find('.field--name-uid input').val().split('[{"value":"').pop().split('",')[0]; // returns 'two'
        var date = $authorContext.find('.field--name-created input').val();

        if (date) {
          return Drupal.t('By @name on @date', {
            '@name': name,
            '@date': date
          });
        }

        if (name) {
          return Drupal.t('By @name', {
            '@name': name
          });
        }
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
