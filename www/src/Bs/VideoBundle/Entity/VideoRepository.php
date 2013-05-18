<?php

namespace Bs\VideoBundle\Entity;

use Doctrine\ORM\EntityRepository;

class VideoRepository extends EntityRepository
{
    public function countVideos()
    {
        $queryBuilder = $this->makeQuery();
        return $queryBuilder
            ->select($queryBuilder->expr()->countDistinct("v.id"))
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function findVideos($filter, $offset, $limit)
    {
        $order = array(
            "newest" => "v.created_at",
            "category" => "category",
            "most_viewed" => "v.views",
            "duration" => "v.duration",
            "tricks" => "duration",
        );

        if (!isset($order[$filter])) {
            return array();
        }
        return $this->makeQuery()
            ->setMaxResults($limit)
            ->setFirstResult($offset)
            ->orderBy($order[$filter], "ASC")
            ->getQuery()
            ->getResult();
    }

    /**
     * @return \Doctrine\ORM\QueryBuilder
     */
    private function makeQuery()
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select("v")
            ->from("BsVideoBundle:Video", "v")
            ->leftJoin("v.Tricks", "t");

    }
}