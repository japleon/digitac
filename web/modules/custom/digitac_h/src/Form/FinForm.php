<?php
namespace Drupal\digitac_h\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Ajax\InvokeCommand;


class FinForm extends FormBase {

    public function getFormId(){
        return 'fin_form';
    }

    public function buildForm(array $form, FormStateInterface $form_state) {
//        $form = parent::blockForm($form, $form_state);

        \Drupal::service('honeypot')->addFormProtection($form, $form_state, ['honeypot', 'time_restriction']);

        $form['#prefix'] = '<div id="my-form-wrapper">';
        $form['#suffix'] = '</div>';
        

        $form['#attached']['library'][] = 'core/drupal.ajax';
        $form['#attached']['library'][] = 'core/jquery';

        $form['fin_header'] = [
          '#type' => 'markup',
          '#markup' => t("<h2>Solicita información</h2>")
        ];

        $form['fin_name'] = [
          '#type' => 'textfield',
          '#title' => $this->t('Nombre'),
          '#description' => ' ',
          '#default_value' => $config['fin_name'] ?? '',
          '#required' => TRUE,
        ];

        $form['fin_email'] = [
          '#type' => 'textfield',
          '#title' => $this->t('Email'),
          '#placeholder' => $this->t('email@email.com'),
          '#description' => ' ',
          '#default_value' => $config['fin_email'] ?? '',
          '#required' => TRUE,
        ];

        $form['fin_producto'] = array(
          '#title' => t('Producto'),
          '#type' => 'select',
          '#description' => ' ',
          '#placeholder' => 'Seleccionar producto.',
          '#options' => array(t('Seleccionar producto'), t('Producto 1'), t('Producto 2'), t('Producto 3')),
          '#default_value' => $config['fin_producto'] ?? '',
          '#required' => TRUE,
        );

        $form['fin_body'] = [
          '#type' => 'textarea',
          '#title' => $this->t('Mensaje'),
          '#description' => ' ',
          '#default_value' => $config['fin_body'] ?? '',
          '#required' => TRUE,
        ];


        $form['fin_disclaimer'] = array(
          '#type' => 'checkbox',
          '#title' => t("Acepto las <a href='/condiciones-uso'>concidiones de uso</a> y la <a href='/politica-privacidad'>politica de privacidad</a>*"),
          '#suffix' => '<div class="form-item disclaimer-item" ><div id="disclaimer_result2" class="description"></div></div>'
        );


        $form['g-recaptcha-response'] = [
          '#type' => 'hidden',
          '#value' => $this->t('This value will be automatically filled by recaptcha'),
          '#attributes' => [
              'id' => ['g-recaptcha-response'], 
              'data-sitekey' => '6Le1ReAoAAAAAKZ3o8FY_JjafE5IOdk3bsjGgBQm'],
          '#suffix' => '<div class="form-item captcha-item" ><div id="captcha_result2" class="description"></div></div>'

      ];


        $form['actions'] = [
          '#type' => 'button',
          '#value' => $this->t('Enviar'),
          '#ajax' => [
            'wrapper' => 'my-form-wrapper',
            'callback' => '::setMessage',
          ],
          '#suffix' => '</div>'
        ];

        return $form;
      }

    

 /**
   *
   */
  public function setMessage(array $form, FormStateInterface $form_state) {

    $text_error = "";
    $bool_error = FALSE;
    $color_error = "red";
    $color_no_error = "black";

    $response = new AjaxResponse();


    $values = $form_state->getUserInput('g-recaptcha-response'); // get the value from the field ( hidden field ).
    $recaptcha = new \ReCaptcha\ReCaptcha('6Le1ReAoAAAAAMko4Qax-qZ7D5XBfVnm8zMI5UQV');
    $resp = $recaptcha->setExpectedAction('a1')
           ->setScoreThreshold(0.5)
           ->verify($values['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);

    if ($resp->isSuccess()) {
          $text_error = t('');
          $response->addCommand(new HtmlCommand('#captcha_result2', $text_error));    
          $response->addCommand(new InvokeCommand('#captcha_result2', 'css', ['color', $color_no_error]));   
       } else {
          $bool_error = TRUE;
          $text_error = t('Captcha field is required.');
          $response->addCommand(new HtmlCommand('#captcha_result2', $text_error));    
          $response->addCommand(new InvokeCommand('#captcha_result2', 'css', ['color', $color_error]));   
        }
    


    if (!$form_state->getValue('fin_name') || empty($form_state->getValue('fin_name'))) {
      $bool_error = TRUE;
      $text_error = t('El campo nombre es obligatorio.');
      $response->addCommand(new HtmlCommand('#edit-fin-name--description', $text_error));    
      $response->addCommand(new InvokeCommand('#edit-fin-name--description', 'css', ['color', $color_error]));   
    }
    else
    {
      $text_error = t('');
      $response->addCommand(new HtmlCommand('#edit-fin-name--description', $text_error));    
      $response->addCommand(new InvokeCommand('#edit-fin-name--description', 'css', ['color', $color_no_error]));   
    }

    if (!$form_state->getValue('fin_email') || empty($form_state->getValue('fin_email'))) {
      $bool_error = TRUE;
      $text_error = t('El campo email es obligatorio.');
      $response->addCommand(new HtmlCommand('#edit-fin-email--description', $text_error));    
      $response->addCommand(new InvokeCommand('#edit-fin-email--description', 'css', ['color', $color_error]));   
    }
    else
    {
      $text_error = t('');
      $response->addCommand(new HtmlCommand('#edit-fin-email--description', $text_error));    
      $response->addCommand(new InvokeCommand('#edit-fin-email--description', 'css', ['color', $color_no_error]));   
    }

    if (!$form_state->getValue('fin_producto') || empty($form_state->getValue('fin_producto') || $form_state->getValue('fin_producto')=='0' )) {
      $bool_error = TRUE;
      $text_error = t('El campo producto es obligatorio.');
      $response->addCommand(new HtmlCommand('#edit-fin-producto--description', $text_error));    
      $response->addCommand(new InvokeCommand('#edit-fin-producto--description', 'css', ['color', $color_error]));   
    }
    else
    {
      $text_error = t('');
      $response->addCommand(new HtmlCommand('#edit-fin-producto--description', $text_error));    
      $response->addCommand(new InvokeCommand('#edit-fin-producto--description', 'css', ['color', $color_no_error]));   
    }


    if (!$form_state->getValue('fin_body') || empty($form_state->getValue('fin_body'))) {
      $bool_error = TRUE;
      $text_error = t('El campo mensaje es obligatorio.');
      $response->addCommand(new HtmlCommand('#edit-fin-body--description', $text_error));    
      $response->addCommand(new InvokeCommand('#edit-fin-body--description', 'css', ['color', $color_error]));   
    }
    else
    {
      $text_error = t('');
      $response->addCommand(new HtmlCommand('#edit-fin-body--description', $text_error));    
      $response->addCommand(new InvokeCommand('#edit-fin-body--description', 'css', ['color', $color_no_error]));   
    }



    if (!$form_state->getValue('fin_disclaimer') || empty($form_state->getValue('fin_disclaimer'))) {
      $bool_error = TRUE;
      $text_error = t('El campo es obligatorio.');
      $response->addCommand(new HtmlCommand('#disclaimer_result2', $text_error));    
      $response->addCommand(new InvokeCommand('#disclaimer_result2', 'css', ['color', $color_error]));   
    }
    else
    {
      $text_error = t('');
      $response->addCommand(new HtmlCommand('#disclaimer_result2', $text_error));    
      $response->addCommand(new InvokeCommand('#disclaimer_result2', 'css', ['color', $color_no_error]));   

    }
    
    if (!$bool_error)
    {
            $values = $form_state->getValues();      
            $url = 'https://go.community.minsait.com/l/915101/2022-04-29/l9pbh';
            

            $response->addCommand(
              new HtmlCommand(
                '#fin-form',
                '<div class="my_top_message">' . t('<h3>Thanks!</h3><p>Your e-mail has been successfully subscribed.'). '</p></div>')
            );
        
    }

    return $response;

   }



    /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
//    parent::blockSubmit($form, $form_state);

return true;


    }

}