<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixture extends Fixture
{

    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail("gar@gmail.com");
        $user->setUsername("gar@gmail.com");
        $user->setSex("masculino");
        $user->setBirthDate(new \DateTimeImmutable('1990-01-01'));
        $user->setFullName("Garfield o rei do pedaço");
        $user->setRoles(["ROLE_USER"]);
        $user->setPassword($this->passwordHasher->hashPassword($user,"G@rfield123"));

        $manager->persist($user);
        $manager->flush();
    }
}
