<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(
        string $email, 
        string $plaintextPassword, 
        UserPasswordHasherInterface $passwordHasher,
        string $sex,
        string $fullName
        ): void
    {
        $user = new User();
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setPassword($hashedPassword);
        $user->setEmail($email);
        $user->setUsername($email);
        $user->setSex($sex);
        $user->setFullName($fullName);
        $user->setRoles(["ROLE_USER"]);

        $this->userRepository->save($user);
    }
}
