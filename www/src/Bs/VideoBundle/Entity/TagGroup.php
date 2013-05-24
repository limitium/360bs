<?php

namespace Bs\VideoBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * TagGroup
 */
class TagGroup
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
     * Set name
     *
     * @param string $name
     * @return TagGroup
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
     * @return TagGroup
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
    /**
     * @var integer
     */
    private $weight;


    /**
     * Set weight
     *
     * @param integer $weight
     * @return TagGroup
     */
    public function setWeight($weight)
    {
        $this->weight = $weight;
    
        return $this;
    }

    /**
     * Get weight
     *
     * @return integer 
     */
    public function getWeight()
    {
        return $this->weight;
    }
}
