<?php

namespace Bs\UserBundle\Controller;

use Symfony\Component\HttpFoundation\RedirectResponse;
use FOS\UserBundle\Controller\RegistrationController as BaseController;

class RegistrationController extends BaseController
{
    public function registerAction()
    {
        $form = $this->container->get('fos_user.registration.form');
        $formHandler = $this->container->get('fos_user.registration.form.handler');

        $process = $formHandler->process(false);
        if ($process) {
            $user = $form->getData();

            $this->setFlash('success', 'registration.flash.user_created');

            $url = $this->container->get('router')->generate('video', array('filter' => 'newset'));
            $response = new RedirectResponse($url);

            $this->authenticateUser($user, $response);

            return $response;
        }

        return $this->container->get('templating')->renderResponse('FOSUserBundle:Registration:register.html.' . $this->getEngine(), array(
            'form' => $form->createView(),
        ));
    }
}