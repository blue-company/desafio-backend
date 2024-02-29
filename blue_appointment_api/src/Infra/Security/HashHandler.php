<?php

namespace App\Infra\Security;

use Hashids\Hashids;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class HashHandler
{
    private $hashids;
    private UrlGeneratorInterface $urlGenerator;

    public function __construct(
        string $salt,
        int $minLength,
        UrlGeneratorInterface $urlGenerator
    ) {
        $this->hashids = new Hashids($salt, $minLength);
        $this->urlGenerator = $urlGenerator;
    }

    public function generateUniqueLink($token): string
    {
        $url = $this->urlGenerator->generate(
            'api_medical_appointments_view',
            ['token' => $token],
            UrlGeneratorInterface::ABSOLUTE_URL
        );

        return $url;
    }

    public function encodeId(int $id): string
    {
        return $this->hashids->encode($id);
    }

    public function decodeId(string $hash): ?int
    {
        $decoded = $this->hashids->decode($hash);
        $id = count($decoded) > 0 ? $decoded[0] : null;
        return $id;
    }
}
