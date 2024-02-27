<?php

use PHPUnit\Framework\TestCase;
use App\Infra\Dto\MedicalAppointmentDto;

class MedicalAppointmentDtoTest extends TestCase
{
    public function testConstructor(): void
    {
        $requestData = [
            'patientId' => 1,
            'notes' => 'Medical history of the patient.',
            'titleReason' => 'Reason for appointment',
            'descriptionReason' => 'Details about the symptoms.',
            'appointmentDate' => '2024-02-19 14:30:00',
        ];

        $medicalAppointmentDto = new MedicalAppointmentDto($requestData);

        $this->assertInstanceOf(MedicalAppointmentDto::class, $medicalAppointmentDto);
        $this->assertEquals(1, $medicalAppointmentDto->patientId);
        $this->assertEquals('Medical history of the patient.', $medicalAppointmentDto->notes);
        $this->assertEquals('Reason for appointment', $medicalAppointmentDto->titleReason);
        $this->assertEquals('Details about the symptoms.', $medicalAppointmentDto->descriptionReason);
        $this->assertInstanceOf(\DateTimeInterface::class, $medicalAppointmentDto->appointmentDate);
    }

}
