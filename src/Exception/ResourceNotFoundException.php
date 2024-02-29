<?php

namespace App\Exception;

use Symfony\Component\HttpFoundation\Response;

class ResourceNotFoundException extends JsonException
{
    public function __construct(string $message = "Resource not found")
    {
        parent::__construct($message, Response::HTTP_NOT_FOUND);
    }

}