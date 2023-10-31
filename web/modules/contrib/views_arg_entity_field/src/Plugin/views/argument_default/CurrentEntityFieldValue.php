<?php

namespace Drupal\views_arg_entity_field\Plugin\views\argument_default;

use Drupal\Core\Cache\Cache;
use Drupal\Core\Cache\CacheableDependencyInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\EntityFieldManagerInterface;
use Drupal\Core\Entity\ContentEntityTypeInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\views\Plugin\views\argument_default\ArgumentDefaultPluginBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Default argument plugin to get a field value (or values) off a 'current'
 * entity. THe current entity is determined from the route parameters.
 *
 * @ingroup views_argument_default_plugins
 *
 * @ViewsArgumentDefault(
 *   id = "current_entity_field_value",
 *   title = @Translation("Field value from Current Entity")
 * )
 */
class CurrentEntityFieldValue extends ArgumentDefaultPluginBase implements CacheableDependencyInterface {

  /**
   * Drupal\Core\Routing\CurrentRouteMatch definition.
   *
   * @var \Drupal\Core\Routing\CurrentRouteMatch
   */
  protected $routeMatch;

  /**
   * Drupal\Core\Entity\EntityTypeManagerInterface definition.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Drupal\Core\Entity\EntityFieldManagerInterface definition.
   *
   * @var \Drupal\Core\Entity\EntityFieldManagerInterface
   */
  protected $entityFieldManager;

  /**
   * Constructs a Session object.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, CurrentRouteMatch $current_route_match, EntityTypeManagerInterface $entity_type_manager, EntityFieldManagerInterface $entity_field_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->routeMatch = $current_route_match;
    $this->entityTypeManager = $entity_type_manager;
    $this->entityFieldManager = $entity_field_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('current_route_match'),
      $container->get('entity_type.manager'),
      $container->get('entity_field.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function defineOptions() {
    $options = parent::defineOptions();
    $options['entity_type_id'] = ['default' => 'node'];
    $options['field_name'] = ['default' => ''];
    $options['empty_value'] = ['default' => ''];
    $options['multiple_values'] = ['default' => 'concatenate'];
    $options['multiple_values_separator'] = ['default' => '+'];
    $options['single_value_delta'] = ['default' => '0'];
    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    parent::buildOptionsForm($form, $form_state);

    $form['#type'] = 'fieldset';
    $form['#title'] = $this->t('Options');

    if ($submitted_values = $form_state->getValue(['options', 'argument_default', 'current_entity_field_value'])) {
      $values = $submitted_values + $this->options;
    }
    else {
      $values = $this->options;
    }

    $entity_types = $this->getEntityTypes();
    $form['entity_type_id'] = [
      '#type' => 'select',
      '#title' => $this->t('Entity Type'),
      '#description' => $this->t('Select the entity type to pull field values from. The entity will be determined from the route parameters.'),
      '#options' => $entity_types,
      '#default_value' => $values['entity_type_id'],
      '#required' => TRUE,
    ];

    // Create a field list for each entity type using #states to show/hide the
    // list based on the entity_type_id selection. Attempted to do this with
    // AJAX but there were two problems:
    // 1) The ajax handler would submit the form on the "Add filter" form.
    // 2) Changing the selected entity type id after saving would return an
    //    illegal choice error on the field_name field.
    foreach ($entity_types as $entity_type_id => $label) {
      $options = $this->getEntityFields($entity_type_id);
      $form['field_name'][$entity_type_id] = [
        '#type' => 'select',
        '#title' => $this->t('Entity Field'),
        '#description' => $this->t('Select the field to pull values from.'),
        '#options' => $options,
        '#default_value' => isset($options[$values['field_name']]) ? $values['field_name'] : '',
        '#states' => [
          'visible' => [
            [':input[name="options[argument_default][current_entity_field_value][entity_type_id]"]' => ['value' => $entity_type_id]],
          ],
        ],
      ];
    }

    $form['empty_value'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Value to return if the entity field exists, but is empty'),
      '#description' => $this->t('Fallback value to return when if the entity field exists but is empty. For example, if you want this filter to be skipped entirely if the field is empty, you can set an exception value in the "Exceptions" section below, and set this value to match.'),
      '#default_value' => $values['empty_value'],
    ];

    $form['multiple_values'] = [
      '#type' => 'radios',
      '#title' => $this->t('Multiple Values Handling'),
      '#description' => $this->t('Specify how to handle fields with multiple values. If you choose to concatenate, you\'ll need to also make sure to set the "Allow multiple values" option in the "More" section below.'),
      '#options' => [
        'concatenate' => $this->t('Concatenate values'),
        'single' => $this->t('Single value'),
      ],
      '#default_value' => $values['multiple_values'],
    ];

    $form['multiple_values_separator'] = [
      '#type' => 'radios',
      '#title' => $this->t('Multiple Values Separator'),
      '#options' => [
        '+' => $this->t('+ (For OR)'),
        ',' => $this->t(', (For AND)'),
      ],
      '#default_value' => $values['multiple_values_separator'],
      '#states' => [
        'visible' => [
          [':input[name="options[argument_default][current_entity_field_value][multiple_values]"]' => ['value' => 'concatenate']],
        ],
      ],
    ];

    $form['single_value_delta'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Single Value Delta'),
      '#description' => $this->t('Specify which field item to use for the value. Use zero for the first value.'),
      '#default_value' => $values['single_value_delta'],
      '#states' => [
        'visible' => [
          [':input[name="options[argument_default][current_entity_field_value][multiple_values]"]' => ['value' => 'single']],
        ],
      ],
    ];

  }

  /**
   * Provide the default form form for submitting options
   */
  public function submitOptionsForm(&$form, FormStateInterface $form_state, &$options = []) {
    // Just take the selected value from the selected entity type's field names.
    if (!empty($options['field_name'][$options['entity_type_id']])) {
      $options['field_name'] = $options['field_name'][$options['entity_type_id']];
    }
    else {
      // Otherwise set to an empty string
      $options['field_name'] = '';
    }
  }

  /**
   * {@inheritdoc}
   */
  public function getArgument() {
    $value = NULL;
    if ($entity = $this->routeMatch->getParameter($this->options['entity_type_id'])) {
      list($field_name, $property) = explode(':', $this->options['field_name']);
      if ($entity->hasField($field_name)) {
        if ($entity->{$field_name}->isEmpty()) {
          // If our entity has the field but is empty, we return the empty value
          // if provided.
          $value = $this->options['empty_value'] ? $this->options['empty_value'] : NULL;
        }
        else {
          // Otherwise we pull the values and process as necessary.
          $values = array_column($entity->{$field_name}->getValue(), $property);
          if ($this->options['multiple_values'] == 'concatenate') {
            $value = implode($this->options['multiple_values_separator'], $values);
          }
          else {
            $value = isset($values[$this->options['single_value_delta']]) ? $values[$this->options['single_value_delta']] : NULL;
          }
        }
        // Add cache tags to the view.
        // See https://www.drupal.org/project/drupal/issues/2853592.
        $this->view->element['#cache']['tags'] = $this->view->element['#cache']['tags'] ?? [];
        $this->view->element['#cache']['tags'] = array_merge($this->view->element['#cache']['tags'], $entity->getCacheTags());
      }
    }

    return $value;
  }

  /**
   * Get list of entity types formatted for options list.
   */
  protected function getEntityTypes() {
    $options = [];
    foreach ($this->entityTypeManager->getDefinitions() as $entity_type_id => $definition) {
      if ($definition instanceof ContentEntityTypeInterface) {
        $options[$entity_type_id] = $definition->getLabel();
      }
    }
    asort($options);
    return $options;
  }

  /**
   * Get options list of fields for a given entity type.
   */
  protected function getEntityFields($entity_type_id) {
    $options = ['' => '- Select Field Name -'];
    $defs = $this->entityFieldManager->getFieldStorageDefinitions($entity_type_id);
    foreach ($this->entityFieldManager->getFieldStorageDefinitions($entity_type_id) as $field_name => $definition) {
      $properties = $definition->getPropertyNames();
      foreach ($properties as $property) {
        // Skip the loaded 'entity' object property on entity reference fields
        if ($property == 'entity') continue;
        $key = "$field_name:$property";
        if ($property == $definition->getMainPropertyName()) {
          $options[$key] = $field_name;
        }
        else {
          $options[$key] = $key;
        }
      }
    }
    return $options;
  }


  /**
   * {@inheritdoc}
   */
  public function getCacheMaxAge() {
    return Cache::PERMANENT;
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts() {
    return ['url'];
  }

}
