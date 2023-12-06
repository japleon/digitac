<?php
namespace Drupal\digitac_h\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\comment\Entity\Comment;


/**
 * Provides route responses for the Example module.
 */
class DigitacHController extends ControllerBase {

  /**
   * Returns a simple page.
   *
   * @return array
   *   A simple renderable array.
   */
  public function estadoReto($nid,$estado) {

    $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);     

    if ($estado == 'abi')
    {
    $node->field_reto_estado=14; 
    $node->setPublished(TRUE)->save();  
    }
    if ($estado == 'bor')
    {
    $node->field_reto_estado=13; 
    $node->status = false;
    $node->save();  
    }
    if ($estado == 'cer')
    {
    $node->field_reto_estado=15; 
    $node->setPublished(TRUE)->save();  
    }

    return [
        '#theme' => 'estado_reto_template',
        '#nid' => $nid,
        '#estado' => $estado
    ];
  }

  public function estadoIdea($nid,$estado) {

    $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);     

    if ($estado == 'bor')
    {
    $node->field_idea_estado=16; 
    $node->status = false;
    $node->save();  
    }
    if ($estado == 'eva')
    {
    $node->field_idea_estado=18; 
    $node->status = true;
    $node->save();  
    }
    if ($estado == 'abi')
    {
    $node->field_idea_estado=17; 
    $node->setPublished(TRUE)->save();  
    }
    if ($estado == 'cer')
    {
    $node->field_idea_estado=19; 
    $node->setPublished(TRUE)->save();  
    }

    return [
        '#theme' => 'estado_idea_template',
        '#nid' => $nid,
        '#estado' => $estado
    ];
  }


  public function estadoExperiencia($nid,$estado) {

    $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);     

    if ($estado == 'bor')
    {
    $node->field_idea_estado=16; 
    $node->status = false;
    $node->save();  
    }
    if ($estado == 'eva')
    {
    $node->field_idea_estado=18; 
    $node->status = true;
    $node->save();  
    }
    if ($estado == 'abi')
    {
    $node->field_idea_estado=17; 
    $node->setPublished(TRUE)->save();  
    }
    if ($estado == 'cer')
    {
    $node->field_idea_estado=19; 
    $node->setPublished(TRUE)->save();  
    }

    return [
        '#theme' => 'estado_experiencia_template',
        '#nid' => $nid,
        '#estado' => $estado
    ];
  }



  public function comentarioEliminar($id) {
    
    
    $comment = \Drupal::entityTypeManager()->getStorage('comment')->load($id);  

    if ($comment){

      $userID = \Drupal::currentUser()->id();
      $com_ent_id= $comment->getCommentedEntity()->id();
      $com_ent_bundle= $comment->getCommentedEntity()->bundle();

      \Drupal::logger('my_module')->error($com_ent_bundle);
      
      if ($comment->getOwner()->id() == $userID)
      {
        $comment->delete();
        return [
            '#theme' => 'eliminar_comentario_template',
            '#com_ent_id' => $com_ent_id,
            "#com_ent_bundle" => $com_ent_bundle
        ];
      }
      else
      {
        throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException();
      }

    }
    else
    {
      throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException();
    }



  }


  public function comentarioAprobar($id) {
  
    $comment = \Drupal::entityTypeManager()->getStorage('comment')->load($id);  
    if ($comment){

//      $userID = \Drupal::currentUser()->id();

//      if ($comment->getOwner()->id() == $userID)
//      {
        $comment->status = 1;
        $comment->save();
return [
  '#theme' => 'aprobar_comentario_template',
  '#id' => $id,
];

 /*     }
      else
      {
        throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException();
      }*/

    }
    else
    {
      throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException();
    }



  }


  public function cuentaEliminar($id) {
    

    $user = \Drupal\user\Entity\User::load($id);
    if ($user){
      $curr_user_ID = \Drupal::currentUser()->id();

      if($curr_user_ID == $user->id())
      {
        $user->block();
        $user->save(); 
        $session_manager = \Drupal::service('session_manager');
        $session_manager->delete(\Drupal::currentUser()->id());   

        return [
          '#theme' => 'eliminar_cuenta_template',
          '#id' => $id,
      ];

      }
      else
      {
        throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException();
      }

    }
    else
    {
      throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException();
    }



  }



}