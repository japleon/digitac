<?php

namespace Drupal\digitac_h\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;


/**
 * Provides a 'Hello' Block.
 *
 * @Block(
 *   id = "digitac_h_reto_block",
 *   admin_label = @Translation("digitac_h_reto_form_block"),
 *   category = @Translation("digitac h reto form"),
 * )
 */
class digitac_hRetoBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    $build = [];
    $build['#theme'] = 'my_reto_block';
    $node_id = ($_GET['nid']!='')?$_GET['nid']:1;
    $node = \Drupal::entityTypeManager()->getStorage('node')->load($node_id);
    $build['form'] = \Drupal::service('entity.form_builder')->getForm($node,'frontal');

    return $build;

  }


}

