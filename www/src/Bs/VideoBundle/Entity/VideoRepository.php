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

    public function findVideos($offset, $limit)
    {
        $order = array(
            "newset" => "created_at",
            "most_viewed" => "views",
            "duration" => "duration",
            "tricks" => "duration",
        );
        return $this->makeQuery()
            ->setMaxResults($limit)
            ->setFirstResult($offset)
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
            ->leftJoin("v.Tricks", "t")
            ->orderBy("v.created_at", "ASC");
    }
}