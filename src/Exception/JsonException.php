<?php

namespace App\Exception;

use RuntimeException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class JsonException extends RuntimeException implements HttpExceptionInterface
{
    protected int $statusCode = Response::HTTP_BAD_REQUEST;
    protected array $headers = ['Content-Type' => 'application/json'];

    public function __construct(string $message, int $statusCode)
    {
        parent::__construct($message);
        $this->statusCode = $statusCode;
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    public function getHeaders(): array
    {
        return $this->headers;
    }
}