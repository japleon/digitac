<?php

namespace Drupal\digitac_h\Plugin\Action;

use Drupal\node\Entity\Node;
use Drupal\views_bulk_operations\Action\ViewsBulkOperationsActionBase;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Reto Estado Borrador.
 *
 * @Action(
 *   id = "digitac_h_reto_estado_borrador",
 *   label = @Translation("Reto Estado Borrador"),
 *   type = "",
 *   confirm = FALSE
 * )
 */

class RetoEstadoBorrador extends ViewsBulkOperationsActionBase {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function execute(ContentEntityInterface $entity = NULL) {

    $entity->set('field_reto_estado',13); 
    $entity->set('status',0); 
    $entity->save();  
    return $this->t('El estado de los retos ha cambiado a Borrador.');

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