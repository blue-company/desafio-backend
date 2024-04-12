<?php

namespace App\Infra\Dto;

class MedicalAppointmentDto
{
    public ?string $notes = null;
    public ?string $titleReason = null;
    public ?string $descriptionReason = null;
    public ?\DateTimeInterface $appointmentDate = null;
    public ?int $patientId = null;

    public function __construct(array $requestData)
    {
        $this->patientId = $requestData['patientId'];
        $this->notes = $requestData['notes'];
        $this->titleReason = $requestData['titleReason'];
        $this->descriptionReason = $requestData['descriptionReason'];
        $this->appointmentDate = new \DateTime($requestData['appointmentDate']);
    }
}
