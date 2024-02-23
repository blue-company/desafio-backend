<?php

namespace App\Service;

use App\Dto\UserDto;
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
        UserDto $userDto,
        UserPasswordHasherInterface $passwordHasher
    ): void
    {
        $user = new User();
        $user->initializeFromDto($userDto);
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $userDto->password
        );
        $user->setPassword($hashedPassword);
        $user->setRoles(["ROLE_USER"]);
        $this->userRepository->save($user);
    }
}
