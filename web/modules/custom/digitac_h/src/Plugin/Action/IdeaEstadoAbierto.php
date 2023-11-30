<?php

namespace Drupal\digitac_h\Plugin\Action;

use Drupal\node\Entity\Node;
use Drupal\views_bulk_operations\Action\ViewsBulkOperationsActionBase;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Idea Estado Abierto.
 *
 * @Action(
 *   id = "digitac_h_idea_estado_abierto",
 *   label = @Translation("Idea Estado Abierto"),
 *   type = "",
 *   confirm = FALSE
 * )
 */

class IdeaEstadoAbierto extends ViewsBulkOperationsActionBase {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function execute(ContentEntityInterface $entity = NULL) {

    $entity->set('field_idea_estado',17); 
    $entity->set('status',1); 
    $entity->save();  
    return $this->t('Some result');

  }

  /**
   * {@inheritdoc}
   */
  public function access($object, AccountInterface $account = NULL, $return_as_object = FALSE) {
    if ($object instanceof Node) {
      $can_update = $object->access('update', $account, TRUE);
      $can_edit = $object->access('edit', $account, TRUE);
      return $can_edit->andIf($can_update);
    }
    return FALSE;
  }
}