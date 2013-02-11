<?php

namespace Bs\VideoBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Video
 */
class Video
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $vid;

    /**
     * @var string
     */
    private $name;

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
     * Set vid
     *
     * @param string $vid
     * @return Video
     */
    public function setVid($vid)
    {
        $this->vid = $vid;
    
        return $this;
    }

    /**
     * Get vid
     *
     * @return string 
     */
    public function getVid()
    {
        return $this->vid;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Video
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
     * Add Tags
     *
     * @param \Bs\VideoBundle\Entity\Tag $tags
     * @return Video
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
