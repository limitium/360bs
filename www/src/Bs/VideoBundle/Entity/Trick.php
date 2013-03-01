<?php

namespace Bs\VideoBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Trick
 */
class Trick
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $start;

    /**
     * @var integer
     */
    private $end;

    /**
     * @var \Bs\VideoBundle\Entity\Video
     */
    private $Video;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $Tags;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->Tags = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
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
     * Set start
     *
     * @param integer $start
     * @return Trick
     */
    public function setStart($start)
    {
        $this->start = $start;
    
        return $this;
    }

    /**
     * Get start
     *
     * @return integer 
     */
    public function getStart()
    {
        return $this->start;
    }

    /**
     * Set end
     *
     * @param integer $end
     * @return Trick
     */
    public function setEnd($end)
    {
        $this->end = $end;
    
        return $this;
    }

    /**
     * Get end
     *
     * @return integer 
     */
    public function getEnd()
    {
        return $this->end;
    }

    /**
     * Set Video
     *
     * @param \Bs\VideoBundle\Entity\Video $video
     * @return Trick
     */
    public function setVideo(\Bs\VideoBundle\Entity\Video $video)
    {
        $this->Video = $video;
    
        return $this;
    }

    /**
     * Get Video
     *
     * @return \Bs\VideoBundle\Entity\Video 
     */
    public function getVideo()
    {
        return $this->Video;
    }

    /**
     * Add Tags
     *
     * @param \Bs\VideoBundle\Entity\Tag $tags
     * @return Trick
     */
    public function addTag(\Bs\VideoBundle\Entity\Tag $tags)
    {
        $this->Tags[] = $tags;
    
        return $this;
    }

    /**
     * Remove Tags
     *
     * @param \Bs\VideoBundle\Entity\Tag $tags
     */
    public function removeTag(\Bs\VideoBundle\Entity\Tag $tags)
    {
        $this->Tags->removeElement($tags);
    }

    /**
     * Get Tags
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getTags()
    {
        return $this->Tags;
    }
}