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
     * @var float
     */
    private $duration;

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
     * Set duration
     *
     * @param float $duration
     * @return Video
     */
    public function setDuration($duration)
    {
        $this->duration = $duration;
    
        return $this;
    }

    /**
     * Get duration
     *
     * @return float 
     */
    public function getDuration()
    {
        return $this->duration;
    }

    /**
     * Add Tricks
     *
     * @param \Bs\VideoBundle\Entity\Trick $tricks
     * @return Video
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
     * @var \DateTime
     */
    private $created_at;

    /**
     * @var integer
     */
    private $views;


    /**
     * Set created_at
     *
     * @param \DateTime $createdAt
     * @return Video
     */
    public function setCreatedAt($createdAt)
    {
        $this->created_at = $createdAt;
    
        return $this;
    }

    /**
     * Get created_at
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Set views
     *
     * @param integer $views
     * @return Video
     */
    public function setViews($views)
    {
        $this->views = $views;
    
        return $this;
    }

    /**
     * Get views
     *
     * @return integer 
     */
    public function getViews()
    {
        return $this->views;
    }
}