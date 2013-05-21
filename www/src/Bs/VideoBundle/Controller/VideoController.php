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
use Symfony\Component\HttpFoundation\Response;

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
     * Displays a form to create a new Video entity.
     *
     * @Route("/{video_id}/{trick_id}", name="video_show",defaults={"trick_id"=":trick_id"},requirements={"trick_id"=":page|\d+","video_id"=":video_id|\d+"})
     * @Template()
     */
    public function showAction($video_id, $trick_id)
    {
        $em = $this->getDoctrine()->getManager();

        $video = $em->getRepository('BsVideoBundle:Video')->find($video_id);

        if (!$video) {
            throw $this->createNotFoundException('Unable to find Video entity.');
        }


        return array(
            'video' => $video,
        );
    }

    /**
     * Lists all Video entities.
     *
     * @Route("/load/{filter}/{page}", name="video_load",defaults={"page"="1"},requirements={"page"=":page|\d+","filter"=":filter|newest|category|most_viewed|duration|tricks"})
     * @Template()
     */
    public function loadAction($filter, $page)
    {
        $videosPerPage = $this->container->getParameter("paginator_videos");

        $repository = $this->getDoctrine()->getManager()->getRepository('BsVideoBundle:Video');

        $videos = $repository->findVideos($filter, --$page * $videosPerPage, $videosPerPage);

        $videosData = array();
        foreach ($videos as $video) {
            /**
             * @var \Bs\VideoBundle\Entity\Video
             */
            $video;
            $videosData[] = array(
                "id" => $video->getId(),
                "vid" => $video->getVid(),
                "name" => $video->getName(),
                "service" => $video->getService(),
                "views" => $video->getViews(),
                "duration" => $video->getDuration(),
                "thumbnail" => $video->getThumbnail(),
                "created_at" => $video->getCreatedAt()->getTimestamp() * 1000,
                "tricks" => $video->getSortedTricks()
            );
        }

        return array(
            'data' => array(
                'maxSize' => $this->container->getParameter("paginator_size"),
                'noOfPages' => (int)($repository->countVideos() / $videosPerPage),
                'videos' => $videosData,
            )
        );
    }

    /**
     * Lists all Video entities.
     *
     * @Route("/{filter}/{page}", name="video",defaults={"filter" = "newset","page"=1},requirements={"page"=":page|\d+","filter"=":filter|newest|category|most_viewed|duration|tricks"})
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
     * @Route("/view/{id}", name="video_view")
     * @Method("POST")
     */
    public function viewAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $video = $em->getRepository('BsVideoBundle:Video')->find($id);
        $video->setViews($video->getViews() + 1);
        $em->flush();
        return new Response();
    }

}
