<?php

namespace App\Test\Infra\Dto;

use App\Infra\Dto\UserDto;
use PHPUnit\Framework\TestCase;

class UserDtoTest extends TestCase
{
    public function testConstructWithLasagnaData()
    {
        $requestData = [
            'id' => 1,
            'email' => 'garfield@lasagnalovers.com',
            'sex' => 'male',
            'fullName' => 'Garfield Cat',
            'birthDate' => '1978-06-19',
            'username' => 'garfield',
            'roles' => ['ROLE_CAT'],
            'password' => 'ilove lasagna',
        ];

        $userDto = new UserDto($requestData);

        $this->assertEquals($requestData['id'], $userDto->id);
        $this->assertEquals($requestData['email'], $userDto->email);
        $this->assertEquals($requestData['sex'], $userDto->sex);
        $this->assertEquals($requestData['fullName'], $userDto->fullName);
        $this->assertEquals(new \DateTime($requestData['birthDate']), $userDto->birthDate);
        $this->assertEquals($requestData['email'], $userDto->username);
        $this->assertEquals($requestData['roles'], $userDto->roles);
        $this->assertEquals($requestData['password'], $userDto->password);
    }
}
