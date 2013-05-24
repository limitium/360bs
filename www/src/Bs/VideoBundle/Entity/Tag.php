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
    private $Tricks;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->Tricks = new \Doctrine\Common\Collections\ArrayCollection();
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
    public function setGroup(\Bs\VideoBundle\Entity\TagGroup $group)
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
     * Add Tricks
     *
     * @param \Bs\VideoBundle\Entity\Trick $tricks
     * @return Tag
     */
    public function addTrick(\Bs\VideoBundle\Entity\Trick $tricks)
    {
        $this->Tricks[] = $tricks;
    
        return $this;
    }

    /**
     * Remove Tricks
     *
     * @param \Bs\VideoBundle\Entity\Trick $tricks
     */
    public function removeTrick(\Bs\VideoBundle\Entity\Trick $tricks)
    {
        $this->Tricks->removeElement($tricks);
    }

    /**
     * Get Tricks
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getTricks()
    {
        return $this->Tricks;
    }

    public function __toString(){
        return $this->getName();
    }
    /**
     * @var integer
     */
    private $weight;


    /**
     * Set weight
     *
     * @param integer $weight
     * @return Tag
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
