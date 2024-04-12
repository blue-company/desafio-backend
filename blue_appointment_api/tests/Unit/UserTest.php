<?php

use App\Entity\User;
use App\Infra\Dto\UserDto;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    public function testInitializeFromDto(): void
    {
        $userDto = new UserDto([
            'id' => 1,
            'email' => 'test@example.com',
            'sex' => 'male',
            'fullName' => 'John Doe',
            'birthDate' => '1990-01-01',
            'username' => 'testuser',
            'roles' => ['ROLE_USER'],
            'password' => 'password123',
        ]);

        $user = new User();

        $user->initializeFromDto($userDto);

        $this->assertEquals('test@example.com', $user->getEmail());
        $this->assertEquals('male', $user->getSex());
        $this->assertEquals('John Doe', $user->getFullName());
        $this->assertEquals('test@example.com', $user->getUsername());
        $this->assertEquals(['ROLE_USER'], $user->getRoles());
        $this->assertEquals('password123', $user->getPassword());
    }
}
