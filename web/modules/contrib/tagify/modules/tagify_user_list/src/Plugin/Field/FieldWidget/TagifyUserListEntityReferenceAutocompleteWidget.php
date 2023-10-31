<?php

namespace Drupal\tagify_user_list\Plugin\Field\FieldWidget;

use Drupal\Component\Utility\Crypt;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Site\Settings;
use Drupal\tagify\Plugin\Field\FieldWidget\TagifyEntityReferenceAutocompleteWidget;

/**
 * Plugin implementation Tagify user list entity reference autocomplete widget.
 *
 * @FieldWidget(
 *   id = "tagify_user_list_entity_reference_autocomplete_widget",
 *   label = @Translation("Tagify User List"),
 *   description = @Translation("An autocomplete text field with tagify support for user entity."),
 *   field_types = {
 *     "entity_reference"
 *   },
 *   multiple_values = TRUE
 * )
 */
class TagifyUserListEntityReferenceAutocompleteWidget extends TagifyEntityReferenceAutocompleteWidget {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {

    // Append the match operation to the selection settings.
    $selection_settings = $this->getFieldSetting('handler_settings') + [
      'match_operator' => $this->getSetting('match_operator'),
      'match_limit' => $this->getSetting('match_limit'),
      'placeholder' => $this->getSetting('placeholder'),
    ];
    $target_type = $this->getFieldSetting('target_type');
    $selection_handler = $this->getFieldSetting('handler');
    $data = serialize($selection_settings) . $target_type . $selection_handler;
    $selection_settings_key = Crypt::hmacBase64($data, Settings::getHashSalt());

    $key_value_storage = $this->keyValueFactory->get('entity_autocomplete');
    if (!$key_value_storage->has($selection_settings_key)) {
      $key_value_storage->set($selection_settings_key, $selection_settings);
    }

    // User field definition doesn't have fieldStorage defined.
    $cardinality = $items->getFieldDefinition()->getFieldStorageDefinition()->isMultiple();
    // Handle field cardinality in the Tagify side.
    $limited = !$cardinality ? 'tagify--limited' : '';
    // Handle field autocreate option.
    $autocreate = $this->getSelectionHandlerSetting('auto_create') ? 'tagify--autocreate' : '';

    $element += [
      '#type' => 'entity_autocomplete_tagify_user_list',
      '#default_value' => $items->referencedEntities() ?? NULL,
      '#autocreate' => $this->getSelectionHandlerSetting('auto_create'),
      '#target_type' => $target_type,
      '#selection_handler' => $selection_handler,
      '#selection_settings_key' => $selection_settings_key,
      '#max_items' => $this->getSetting('match_limit'),
      '#attributes' => [
        'class' => [$limited, $autocreate],
      ],
      '#placeholder' => $this->getSetting('placeholder'),
    ];
    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public static function isApplicable(FieldDefinitionInterface $field_definition) {
    $target_type = $field_definition->getFieldStorageDefinition()->getSetting('target_type');
    // Don't allow to user entity reference fields.
    return $target_type === 'user';
  }

}
