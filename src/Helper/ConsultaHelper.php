<?php

namespace App\Helper;

use App\Entity\Consulta;
use App\Exception\InvalidRequestException;

class ConsultaHelper {
    private Cryptografer $cryptografer;

    public function __construct(Cryptografer $cryptografer)
    {
        $this->cryptografer = $cryptografer;
    }

    public function encryptRoute(Consulta $consulta): string
    {
        $cypher = rawurlencode($this->cryptografer->encript($consulta->getId()));
        return "/consultas/$cypher";
    }

    public function validateCreationFields(Consulta $consulta): void
    {
        if($consulta->getDetails() === null) {
            throw new InvalidRequestException("Field 'details' can not be null");
        }
        if($consulta->getData() === null) {
            throw new InvalidRequestException("Field 'data' can not be null");
        }
    }
}