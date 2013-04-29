<?php

namespace Bs\VideoBundle\Controller;

use Bs\VideoBundle\Entity\Trick;
use Bs\VideoBundle\Form\TrickType;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

/**
 * Trick controller.
 *
 * @Route("/trick")
 */
class TrickController extends Controller
{
    /**
     * @Route("/load/{service}/{vid}", name="tricks_load")
     * @Method("GET")
     * @Template("BsVideoBundle:Trick:tricks.html.twig")
     */
    public function loadtricksAction($service, $vid)
    {
        $em = $this->getDoctrine()->getManager();
        $video = $em->getRepository('BsVideoBundle:Video')->findOneBy(array("service" => $service, "vid" => $vid));
        return array(
            "tricks" => $video ? $video->getSortedTricks() : array()
        );
    }

    /**
     * @Route("/", name="trick_create")
     * @Method("POST")
     * @Template("BsVideoBundle:Trick:tricks.html.twig")
     */
    public function createtrickAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $trick = new Trick();
        $form = $this->createForm(new TrickType(), $trick);
        $form->bind($request);
        $video = null;
        if ($form->isValid()) {
            $createdAt = new DateTime();
            $video = $em->getRepository('BsVideoBundle:Video')->findOneBy(array("service" => $trick->getVideo()->getService(), "vid" => $trick->getVideo()->getVid()));
            if (!$video) {
                $video = $trick->getVideo();
                $video->addTrick($trick);
                $video->setCreatedAt($createdAt);
                $video->setViews(0);
                $video->setUploader($this->getUser());
                $em->persist($video);
            } else {
                $trick->setVideo($video);
            }
            $trick->setUploader($this->getUser());
            $trick->setCreatedAt($createdAt);
            $em->persist($trick);
            $em->flush();
        }
        return array(
            "tricks" => $video->getSortedTricks()
        );
    }
}
