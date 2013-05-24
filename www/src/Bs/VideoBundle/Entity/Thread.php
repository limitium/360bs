<?php
namespace Bs\VideoBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\CommentBundle\Entity\Thread as BaseThread;

/**
 */
class Thread extends BaseThread
{
    /**
     * @var string $id
     *
     */
    protected $id;
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $comments;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->comments = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add comments
     *
     * @param \Bs\VideoBundle\Entity\Comment $comments
     * @return Thread
     */
    public function addComment(\Bs\VideoBundle\Entity\Comment $comments)
    {
        $this->comments[] = $comments;
    
        return $this;
    }

    /**
     * Remove comments
     *
     * @param \Bs\VideoBundle\Entity\Comment $comments
     */
    public function removeComment(\Bs\VideoBundle\Entity\Comment $comments)
    {
        $this->comments->removeElement($comments);
    }

    /**
     * Get comments
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getComments()
    {
        return $this->comments;
    }
}
