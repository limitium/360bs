<?php

namespace Bs\VideoBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Bs\VideoBundle\Entity\Trick;
use Bs\VideoBundle\Entity\Video;
use Bs\VideoBundle\Form\TrickType;
use Bs\VideoBundle\Form\VideoType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Video controller.
 *
 * @Route("/video")
 */
class VideoController extends Controller
{
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
     * Lists all Video entities.
     *
     * @Route("/load/{filter}/{page}", name="video_load",defaults={"page"="1"})
     * @Template()
     */
    public function loadAction($filter, $page)
    {
        $videos = array();

        $em = $this->getDoctrine()->getManager();

        foreach ($em->getRepository('BsVideoBundle:Video')->findAll() as $video) {
            /**
             * @var \Bs\VideoBundle\Entity\Video
             */
            $video;
            $videos[] = array(
                "vid" => $video->getVid(),
                "name" => $video->getName(),
                "service" => $video->getService(),
                "views" => $video->getViews(),
                "duration" => $video->getDuration(),
                "tricks" => $video->getSortedTricks()
            );
        }

        return array(
            'data' => array(
                'maxSize' => 8,
                'noOfPages' => 11,
                'videos' => $videos,
            )
        );
    }

    /**
     * Lists all Video entities.
     *
     * @Route("/{filter}/{page}", name="video",defaults={"filter" = "newset","page"=1})
     * @Template()
     */
    public function indexAction($filter, $page)
    {
        $em = $this->getDoctrine()->getManager();


        return array(
            'taggroups' => $em->getRepository('BsVideoBundle:TagGroup')->findAll(),
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
