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

    public function __toString()
    {
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

    /**
     * @return array
     */
    public function getSortedTricks()
    {
        $tricks = $this->getTricks();
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
     * @var \Bs\VideoBundle\Entity\User
     */
    private $Uploader;


    /**
     * Set Uploader
     *
     * @param \Bs\VideoBundle\Entity\User $uploader
     * @return Video
     */
    public function setUploader(\Bs\VideoBundle\Entity\User $uploader)
    {
        $this->Uploader = $uploader;
    
        return $this;
    }

    /**
     * Get Uploader
     *
     * @return \Bs\VideoBundle\Entity\User 
     */
    public function getUploader()
    {
        return $this->Uploader;
    }
    /**
     * @var string
     */
    private $service;


    /**
     * Set service
     *
     * @param string $service
     * @return Video
     */
    public function setService($service)
    {
        $this->service = $service;
    
        return $this;
    }

    /**
     * Get service
     *
     * @return string 
     */
    public function getService()
    {
        return $this->service;
    }
    /**
     * @var string
     */
    private $thumbnail;


    /**
     * Set thumbnail
     *
     * @param string $thumbnail
     * @return Video
     */
    public function setThumbnail($thumbnail)
    {
        $this->thumbnail = $thumbnail;
    
        return $this;
    }

    /**
     * Get thumbnail
     *
     * @return string 
     */
    public function getThumbnail()
    {
        return $this->thumbnail;
    }
    /**
     * @var integer
     */
    private $num_comments;

    /**
     * @var integer
     */
    private $num_tricks;


    /**
     * Set num_comments
     *
     * @param integer $numComments
     * @return Video
     */
    public function setNumComments($numComments)
    {
        $this->num_comments = $numComments;
    
        return $this;
    }

    /**
     * Get num_comments
     *
     * @return integer 
     */
    public function getNumComments()
    {
        return $this->num_comments;
    }

    /**
     * Set num_tricks
     *
     * @param integer $numTricks
     * @return Video
     */
    public function setNumTricks($numTricks)
    {
        $this->num_tricks = $numTricks;
    
        return $this;
    }

    /**
     * Get num_tricks
     *
     * @return integer 
     */
    public function getNumTricks()
    {
        return $this->num_tricks;
    }
}
