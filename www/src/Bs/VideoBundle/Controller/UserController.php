<?php

namespace Bs\VideoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Trick controller.
 *
 * @Route("/rider")
 */
class UserController extends Controller
{
    /**
     * Lists all Video entities.
     *
     * @Route("/top", name="rider_top")
     * @Template()
     */
    public function topAction()
    {
        return array();
    }

    /**
     * @Route("/load", name="riders_load")
     * @Method("GET")
     * @Template()
     */
    public function loadAction()
    {
        $riders = array();

        $em = $this->getDoctrine()->getManager();
        /** @var $rider \Bs\VideoBundle\Entity\User */
        foreach ($em->getRepository('BsVideoBundle:User')->findAll() as $rider) {
            $riders[] = array(
                "id" => $rider->getId(),
                "username" => $rider->getUsername(),
                "count_tricks_made" => sizeof($rider->getTricksMade()),
                "score" => 0
            );
        }

        return array(
            'riders' => $riders,
        );
    }
}