<?php

namespace Bs\VideoBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
/**
 * User
 */
class User
{
    /**
     * @var integer
     */
    protected $id;

    public function __construct()
    {
        parent::__construct();
        // your own logic
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
}
