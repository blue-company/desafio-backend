<?php

namespace App\Dto;

class UserDto
{
    public ?int $id = null;
    public ?string $email = null;
    public ?string $sex = null;
    public ?string $fullName = null;
    public ?\DateTimeInterface $birthDate = null;
    public ?string $username = null;
    public array $roles = [];
    public ?string $password = null;

    public function __construct(array $requestData)
    {
        $this->id = $requestData['id'] ?? null;
        $this->email = $requestData['email'] ?? null;
        $this->sex = $requestData['sex'] ?? null;
        $this->fullName = $requestData['fullName'] ?? null;
        $this->birthDate = new \DateTime($requestData['birthDate']);
        $this->username = $requestData['email'] ?? null;
        $this->roles = $requestData['roles'] ?? [];
        $this->password = $requestData['password'] ?? null;
    }
}
