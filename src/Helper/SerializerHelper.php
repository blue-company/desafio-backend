<?php

namespace App\Helper;

use App\Exception\InvalidRequestException;
use Exception;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class SerializerHelper {
    public function deserialize(string $data, string $class): mixed {
        $normalizers = [new ObjectNormalizer(), new DateTimeNormalizer()];
        $encoders = [new JsonEncoder()];
        
        $serializer = new Serializer($normalizers, $encoders);
        try {
            return $serializer->deserialize($data, $class, 'json');
        } catch (Exception $e) {
            throw new InvalidRequestException("Bad JSON format");
        }
    }
}