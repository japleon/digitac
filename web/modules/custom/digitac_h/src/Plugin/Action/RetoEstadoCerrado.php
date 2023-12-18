<?php

namespace Drupal\digitac_h\Plugin\Action;

use Drupal\node\Entity\Node;
use Drupal\views_bulk_operations\Action\ViewsBulkOperationsActionBase;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Reto Estado Cerrado.
 *
 * @Action(
 *   id = "digitac_h_reto_estado_cerrado",
 *   label = @Translation("Reto Estado Cerrado"),
 *   type = "",
 *   confirm = FALSE
 * )
 */

class RetoEstadoCerrado extends ViewsBulkOperationsActionBase {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function execute(ContentEntityInterface $entity = NULL) {

    $entity->set('field_reto_estado',15); 
    $entity->set('status',1); 
    $entity->save();  
    return $this->t('El estado de los retos ha cambiado a Cerrado.');

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