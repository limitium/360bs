<?php

namespace Bs\UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class BsUserBundle extends Bundle
{
 public function getParent()
    {
        return 'FOSUserBundle';
    }
}
