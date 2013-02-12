<?php

namespace Bs\VideoBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Tag
 */
class Tag
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $name;

    /**
     * @var \Bs\VideoBundle\Entity\TagGroup
     */
    private $Group;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $Videos;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->Videos = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set name
     *
     * @param string $name
     * @return Tag
     */
    public function setName($name)
    {
        $this->name = $name;
    
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set Group
     *
     * @param \Bs\VideoBundle\Entity\TagGroup $group
     * @return Tag
     */
    public function setGroup(\Bs\VideoBundle\Entity\TagGroup $group = null)
    {
        $this->Group = $group;
    
        return $this;
    }

    /**
     * Get Group
     *
     * @return \Bs\VideoBundle\Entity\TagGroup 
     */
    public function getGroup()
    {
        return $this->Group;
    }

    /**
     * Add Videos
     *
     * @param \Bs\VideoBundle\Entity\Video $videos
     * @return Tag
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
}