<?php

namespace Bs\VideoBundle\Controller;

use Bs\VideoBundle\Entity\Trick;
use Bs\VideoBundle\Form\TrickType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Bs\VideoBundle\Entity\Video;
use Bs\VideoBundle\Form\VideoType;

/**
 * Video controller.
 *
 * @Route("/term")
 */
class TermController extends Controller
{
    /**
     * Lists all Video entities.
     *
     * @Route("/", name="term")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();


        return array(
            'taggroups' => $em->getRepository('BsVideoBundle:TagGroup')->findAll(),
        );
    }

    /**
     * Finds and displays a Video entity.
     *
     * @Route("/{id}/mean", name="term_mean")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('BsVideoBundle:Tag')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Term entity.');
        }

        return array(
            'entity' => $entity,
        );
    }


}
