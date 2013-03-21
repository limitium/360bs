<?php

namespace Bs\VideoBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Term controller.
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


    /**
     * Lists all Video tags
     *
     * @Route("/tags", name="video_tags")
     * @Template()
     */
    public function tagsAction()
    {
        $em = $this->getDoctrine()->getManager();

        $tagsHash = array();
        foreach ($em->getRepository('BsVideoBundle:Tag')->findAll() as $tag) {
            $tagsHash[$tag->getId()] = $tag->getName();
        }

        return array(
            'tags' => $tagsHash,
        );
    }
}
