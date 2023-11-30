<?php

namespace Drupal\digitac_h\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;


/**
 * Provides a 'Hello' Block.
 *
 * @Block(
 *   id = "digitac_h_idea_block",
 *   admin_label = @Translation("digitac_h_idea_form_block"),
 *   category = @Translation("digitac h idea form"),
 * )
 */
class digitac_hIdeaBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    $build = [];
    $build['#theme'] = 'my_idea_block';
    $node_id = ($_GET['nid']!='')?$_GET['nid']:1;
    $node = \Drupal::entityTypeManager()->getStorage('node')->load($node_id);
    $build['form'] = \Drupal::service('entity.form_builder')->getForm($node,'frontal');

    return $build;

  }


}

