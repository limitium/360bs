<?php

namespace Bs\CommentBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class BsCommentBundle extends Bundle
{
 public function getParent()
    {
        return 'FOSCommentBundle';
    }
}
