<?php

namespace App\Model;

use DateTimeImmutable;

class Consulta {
    private string $id;
    private DateTimeImmutable $data;
    private string $detalhes;
    private bool $cancelada;
}