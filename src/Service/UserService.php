<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService {
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;
    
    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $paswordHasher
    )
    {
        $this->entityManager = $entityManager;
        $this->passwordHasher =  $paswordHasher;
} 

    public function createUser(User $user): User
    {
        $user->setPassword($this->passwordHasher->hashPassword($user, $user->getPassword()));
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $user;
    }
}