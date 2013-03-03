<?php

namespace Bs\VideoBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class TrickType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('start')
            ->add('end')
            ->add('Tags')
            ->add('Video', new VideoType())
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bs\VideoBundle\Entity\Trick',
            'csrf_protection'   => false,
        ));
    }

    public function getName()
    {
        return 'bs_videobundle_tricktype';
    }
}
