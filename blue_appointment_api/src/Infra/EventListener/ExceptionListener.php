<?php

namespace App\Infra\EventListener;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;

class ExceptionListener
{
    public function onKernelException(ExceptionEvent $event)
    {
        $exception = $event->getThrowable();

        $response = new JsonResponse();
        $statusCode = JsonResponse::HTTP_INTERNAL_SERVER_ERROR;

        if ($exception instanceof HttpExceptionInterface) {
            $statusCode = $exception->getStatusCode();
        }

        $response->setStatusCode($statusCode);

        if ($exception instanceof Throwable) {
            $response->setData(['Error' => $exception->getMessage()]);
        } else {
            $response->setData(['Error' => 'Erro interno do servidor']);
        }

        $event->setResponse($response);
    }
}
