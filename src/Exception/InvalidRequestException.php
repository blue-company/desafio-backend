<?php

namespace App\Exception;

use Symfony\Component\HttpFoundation\Response;

class InvalidRequestException extends JsonException {
    public function __construct(string $message = 'Bad Request')
    {
        parent::__construct($message, Response::HTTP_BAD_REQUEST);
    }
}