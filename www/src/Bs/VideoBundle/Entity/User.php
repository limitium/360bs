<?php

namespace Bs\VideoBundle\Entity;

use FOS\UserBundle\Entity\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

class User extends BaseUser
{

    protected $id;

    public function __construct()
    {
        parent::__construct();
        // your own logic
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $Videos;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $TricksUploaded;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $TricksMade;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Add Videos
     *
     * @param \Bs\VideoBundle\Entity\Video $videos
     * @return User
     */
    public function addVideo(\Bs\VideoBundle\Entity\Video $videos)
    {
        $this->Videos[] = $videos;
    
        return $this;
    }

    /**
     * Remove Videos
     *
     * @param \Bs\VideoBundle\Entity\Video $videos
     */
    public function removeVideo(\Bs\VideoBundle\Entity\Video $videos)
    {
        $this->Videos->removeElement($videos);
    }

    /**
     * Get Videos
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getVideos()
    {
        return $this->Videos;
    }

    /**
     * Add TricksUploaded
     *
     * @param \Bs\VideoBundle\Entity\Trick $tricksUploaded
     * @return User
     */
    public function addTricksUploaded(\Bs\VideoBundle\Entity\Trick $tricksUploaded)
    {
        $this->TricksUploaded[] = $tricksUploaded;
    
        return $this;
    }

    /**
     * Remove TricksUploaded
     *
     * @param \Bs\VideoBundle\Entity\Trick $tricksUploaded
     */
    public function removeTricksUploaded(\Bs\VideoBundle\Entity\Trick $tricksUploaded)
    {
        $this->TricksUploaded->removeElement($tricksUploaded);
    }

    /**
     * Get TricksUploaded
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getTricksUploaded()
    {
        return $this->TricksUploaded;
    }

    /**
     * Add TricksMade
     *
     * @param \Bs\VideoBundle\Entity\Trick $tricksMade
     * @return User
     */
    public function addTricksMade(\Bs\VideoBundle\Entity\Trick $tricksMade)
    {
        $this->TricksMade[] = $tricksMade;
    
        return $this;
    }

    /**
     * Remove TricksMade
     *
     * @param \Bs\VideoBundle\Entity\Trick $tricksMade
     */
    public function removeTricksMade(\Bs\VideoBundle\Entity\Trick $tricksMade)
    {
        $this->TricksMade->removeElement($tricksMade);
    }

    /**
     * Get TricksMade
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getTricksMade()
    {
        return $this->TricksMade;
    }
}