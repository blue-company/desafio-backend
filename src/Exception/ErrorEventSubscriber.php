<?php

namespace App\Exception;

use App\Exception\JsonException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\KernelEvents;

class ErrorEventSubscriber implements EventSubscriberInterface {
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::EXCEPTION => 'onKernelExeption'
        ];
    }

    public function onKernelExeption(ExceptionEvent $event) {
        $exeption = $event->getThrowable();
        $event->stopPropagation();
        $headers = ['Content-Type' => 'application/json'];
        $statusCode = 500;
        $message = $exeption->getMessage() ?? "An unexpected Error has ocurred";

        if($exeption instanceof NotFoundHttpException) {
            $statusCode = $exeption->getStatusCode();
            $message = "Resourse not found";
        }else if($exeption instanceof JsonException) {
            $statusCode =  $exeption->getStatusCode();
            $message = $exeption->getMessage();
        }
        $content = [
            'error' => $message
        ];
        $event->setResponse(
            new Response(json_encode($content), $statusCode, $headers)
        );
    }
}