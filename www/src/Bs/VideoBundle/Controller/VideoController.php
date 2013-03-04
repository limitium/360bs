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
 * @Route("/video")
 */
class VideoController extends Controller
{
    /**
     * Lists all Video entities.
     *
     * @Route("/", name="video")
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

    /**
     * @Route("/tricks/{vid}", name="tricks_load")
     * @Method("GET")
     * @Template("BsVideoBundle:Video:tricks.html.twig")
     */
    public function loadtricksAction(Request $request, $vid)
    {
        $em = $this->getDoctrine()->getManager();

        return array(
            "tricks" => $this->getTricks($vid, $em)
        );
    }

    /**
     * @param $vid
     * @param $em
     * @return array
     */
    private function getTricks($vid, $em)
    {
        $video = $em->getRepository('BsVideoBundle:Video')->findOneBy(array("vid" => $vid));

        $tricks = array();
        if ($video) {
            $tricks = $video->getTricks();
        }
        $tricksData = array();
        foreach ($tricks as $trick) {
            $tags = array();
            foreach ($trick->getTags() as $tag) {
                $tags[] = $tag->getId();
            }
            $tricksData[] = array(
                "start" => $trick->getStart(),
                "end" => $trick->getEnd(),
                "tags" => $tags
            );
        }
        usort($tricksData, function ($a, $b) {
            return $a['start'] - $b['start'];
        });

        return $tricksData;
    }

    /**
     * @Route("/trick/{vid}", name="trick_create")
     * @Method("POST")
     * @Template("BsVideoBundle:Video:tricks.html.twig")
     */
    public function createtrickAction(Request $request, $vid)
    {
        $em = $this->getDoctrine()->getManager();
        $trick = new Trick();
        $form = $this->createForm(new TrickType(), $trick);
        $form->bind($request);

        if ($form->isValid()) {
            $video = $em->getRepository('BsVideoBundle:Video')->findOneBy(array("vid" => $vid));
            if (!$video) {
                $video = $trick->getVideo();
                $em->persist($video);
            } else {
                $trick->setVideo($video);
            }
            $em->persist($trick);
            $em->flush();
        }
        return array(
            "tricks" => $this->getTricks($vid, $em)
        );
    }

    /**
     * Finds and displays a Video entity.
     *
     * @Route("/{id}/show", name="video_show")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('BsVideoBundle:Video')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Video entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity' => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to create a new Video entity.
     *
     * @Route("/new", name="video_new")
     * @Template()
     */
    public function newAction()
    {
        $video = new Video();
        $trick = new Trick();
        $trick->setVideo($video);
        $form = $this->createForm(new TrickType(), $trick);
        $em = $this->getDoctrine()->getManager();
        return array(
            'entity' => $trick,
            'form' => $form->createView(),
            'taggroups' => $em->getRepository('BsVideoBundle:TagGroup')->findAll(),
        );
    }

    /**
     * Creates a new Video entity.
     *
     * @Route("/create", name="video_create")
     * @Method("POST")
     * @Template("BsVideoBundle:Video:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new Video();
        $form = $this->createForm(new VideoType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('video_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form' => $form->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Video entity.
     *
     * @Route("/{id}/edit", name="video_edit")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('BsVideoBundle:Video')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Video entity.');
        }

        $editForm = $this->createForm(new VideoType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity' => $entity,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Video entity.
     *
     * @Route("/{id}/update", name="video_update")
     * @Method("POST")
     * @Template("BsVideoBundle:Video:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('BsVideoBundle:Video')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Video entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new VideoType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('video_edit', array('id' => $id)));
        }

        return array(
            'entity' => $entity,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Video entity.
     *
     * @Route("/{id}/delete", name="video_delete")
     * @Method("POST")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('BsVideoBundle:Video')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Video entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('video'));
    }

    private function createDeleteForm($id)
    {
        return $this->createFormBuilder(array('id' => $id))
            ->add('id', 'hidden')
            ->getForm();
    }
}
