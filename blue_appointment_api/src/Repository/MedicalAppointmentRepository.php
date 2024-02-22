<?php

namespace App\Repository;

use App\Entity\MedicalAppointment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MedicalAppointment>
 *
 * @method MedicalAppointment|null find($id, $lockMode = null, $lockVersion = null)
 * @method MedicalAppointment|null findOneBy(array $criteria, array $orderBy = null)
 * @method MedicalAppointment[]    findAll()
 * @method MedicalAppointment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MedicalAppointmentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MedicalAppointment::class);
    }

    public function save(MedicalAppointment $medicalAppointment): MedicalAppointment
    {
        $entityManager = $this->getEntityManager();
        $entityManager->persist($medicalAppointment);
        $entityManager->flush();
        $entityManager->refresh($medicalAppointment);
        return $medicalAppointment;
    }

//    /**
//     * @return MedicalAppointment[] Returns an array of MedicalAppointment objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('m.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?MedicalAppointment
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}