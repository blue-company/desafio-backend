<?php

namespace App\Helper;

use App\Entity\User;
use App\Exception\InvalidRequestException;

class UserHelper {
    public function validateCreationFields(User $user): void
    {
        if($user->getUsername() === null) {
            throw new InvalidRequestException("Field 'username' can not be null");
        }
        if($user->getPassword() === null) {
            throw new InvalidRequestException("Field 'password' can not be null");
        }
    }
}