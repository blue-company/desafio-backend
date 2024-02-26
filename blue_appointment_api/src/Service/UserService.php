<?php

namespace App\Service;

use App\Entity\User;
use App\Infra\Dto\UserDto;
use App\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;

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
    ): string
    {
        $user = new User();
        $user->initializeFromDto($userDto);
        $isAlreadyUser = $this->userRepository->findBy(
            ["email"=> $user->getEmail()],
        );

        if ($isAlreadyUser) {
            throw new ConflictHttpException("Email is associated to other account!");
        }

        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $userDto->password
        );
        $user->setPassword($hashedPassword);
        $user->setRoles(["ROLE_USER"]);
        return $this->userRepository->save($user);
    }
}
