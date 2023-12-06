<?php

namespace Drupal\digitac_h\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
* Provides a block for the user registration form.
*
* @Block(
*   id = "digitac_h_user_edit_block",
*   admin_label = @Translation("digitac_h_user_edit_form_block"),
 *  category = @Translation("digitac h user edit form"),
* )
*
* Note that we set module to contact so that blocks will be disabled correctly
* when the module is disabled.
*/
class digitac_hUserEditBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    $build = [];
    $build['#theme'] = 'my_user_edit_block';
    $user_id = \Drupal::currentUser()->id();
    $user_curr = \Drupal::entityTypeManager()->getStorage('user')->load($user_id);
    $build['form'] = \Drupal::service('entity.form_builder')->getForm($user_curr,'default');

    return $build;

  }



}