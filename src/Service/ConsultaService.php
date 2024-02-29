<?php

namespace App\Service;

use App\Entity\Consulta;
use App\Exception\ResourceNotFoundException;
use App\Helper\Cryptografer;
use Doctrine\ORM\EntityManagerInterface;

class ConsultaService {

    private EntityManagerInterface $entityManager;
    private Cryptografer $cryptografer;

    public function __construct(
            EntityManagerInterface $entityManager,
            Cryptografer $cryptografer
        )
    {
        $this->entityManager = $entityManager;
        $this->cryptografer = $cryptografer;
    }

    public function findConsultas(): array
    {
        return $this->entityManager->getRepository(Consulta::class)->findAll();
    }

    public function findConsulta(string $path)
    {
        $id = $this->cryptografer->decript($path);
        return $this->entityManager->getRepository(Consulta::class)->find($id);
    }

    public function createConsulta(Consulta $consulta): Consulta
    {
        $this->entityManager->persist($consulta);
        $this->entityManager->flush();
        return $consulta;
    }

    public function updateConsulta(Consulta $updatedConsulta): Consulta
    {
        $consulta = $this->entityManager->getRepository(Consulta::class)->find($updatedConsulta->getId());
        if(!$consulta) {
            throw new ResourceNotFoundException();
        }
        if($updatedConsulta->getData() !== null) {
            $consulta->setData($updatedConsulta->getData());
        }
        if($updatedConsulta->getDetails() !== null) {
            $consulta->setDetails($updatedConsulta->getDetails());
        }
        $this->entityManager->flush();
        return $consulta;
    }

    public function deleteConsulta(Consulta $consulta): void
    {
        $this->entityManager->remove($consulta);
        $this->entityManager->flush();
    }
}