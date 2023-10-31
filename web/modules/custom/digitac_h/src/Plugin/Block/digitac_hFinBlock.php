<?php

namespace Drupal\digitac_h\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;


/**
 * Provides a 'Hello' Block.
 *
 * @Block(
 *   id = "digitac_h_fin_block",
 *   admin_label = @Translation("digitac_h_fin_form_block"),
 *   category = @Translation("digitac h fin form"),
 * )
 */
class digitac_hFinBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    $build = [];
    $build['#theme'] = 'my_fin_block';
    $form = \Drupal::formBuilder()->getForm('\Drupal\digitac_h\Form\FinForm');
    $build['form'] = $form;
    return $build;

  }


}

