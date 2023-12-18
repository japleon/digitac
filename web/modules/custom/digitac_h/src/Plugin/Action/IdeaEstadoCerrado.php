<?php

namespace Drupal\digitac_h\Plugin\Action;

use Drupal\node\Entity\Node;
use Drupal\views_bulk_operations\Action\ViewsBulkOperationsActionBase;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Idea Estado Cerrado.
 *
 * @Action(
 *   id = "digitac_h_idea_estado_cerrado",
 *   label = @Translation("Idea Estado Cerrado"),
 *   type = "",
 *   confirm = FALSE
 * )
 */

class IdeaEstadoCerrado extends ViewsBulkOperationsActionBase {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function execute(ContentEntityInterface $entity = NULL) {

    $entity->set('field_idea_estado',19); 
    $entity->set('status',1); 
    $entity->save();  
    return $this->t('El estado de las :bundles ha cambiado a Cerrado.',[':bundle' => $entity->bundle()]);
    
  }

  /**
   * {@inheritdoc}
   */
  public function access($object, AccountInterface $account = NULL, $return_as_object = FALSE) {
    if ($object instanceof Node) {
      $can_update = $object->access('update', $account, TRUE);
      return $can_update;
    }
    return FALSE;
  }
}