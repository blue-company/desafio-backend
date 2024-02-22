<?php

namespace App\Service;

use App\Entity\MedicalAppointment;
use App\Repository\MedicalAppointmentRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MedicalAppointmentService
{
    private MedicalAppointmentRepository $medicalAppointmentRepository;
    private UserRepository $userRepository;

    public function __construct(
        MedicalAppointmentRepository $medicalAppointmentRepository,
        UserRepository $userRepository
    ) {
        $this->medicalAppointmentRepository = $medicalAppointmentRepository;
        $this->userRepository = $userRepository;
    }

    public function createMedicalAppointment(
        int $patientId, 
        string $notes, 
        \DateTimeInterface $appointmentDate,
        string $descriptionReason,
        string $titleReason,
        ): void
    {
        $patient = $this->userRepository->find($patientId);

        if (!$patient) {
            // Handle patient not found, throw exception, or return an error response
            // You might want to create a custom exception for better error handling
            throw new NotFoundHttpException('Patient not found');
            // or return $this->json(['error' => 'Patient not found'], 404);
        }

        $medicalAppointment = new MedicalAppointment();
        $medicalAppointment->setPatient($patient);
        $medicalAppointment->setNotes($notes);
        $medicalAppointment->setAppointmentDate($appointmentDate);
        $medicalAppointment->setDescriptionReason($descriptionReason);
        $medicalAppointment->setTitleReason($titleReason);

        $this->medicalAppointmentRepository->save($medicalAppointment);
    }
}
