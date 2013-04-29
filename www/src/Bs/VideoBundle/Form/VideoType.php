<?php

namespace Bs\VideoBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class VideoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('vid')
            ->add('service')
            ->add('name')
            ->add('duration')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bs\VideoBundle\Entity\Video'
        ));
    }

    public function getName()
    {
        return 'bs_videobundle_videotype';
    }
}
