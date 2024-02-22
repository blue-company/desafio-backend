<?php

namespace App\Service;

use App\Dto\MedicalAppointmentDto;
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

    public function createMedicalAppointment(MedicalAppointmentDto $medicalAppointmentDto): MedicalAppointment
    {
        $patient = $this->userRepository->find($medicalAppointmentDto->patientId);

        if (!$patient) {
            throw new NotFoundHttpException('Patient not found');
        }

        $medicalAppointment = new MedicalAppointment();
        $medicalAppointment->initializeFromDto($medicalAppointmentDto, $patient);

        return $this->medicalAppointmentRepository->save($medicalAppointment);
    }

    public function cancelMedicalAppointment(int $appointmentId): void
    {
        $medicalAppointment = $this->medicalAppointmentRepository->find($appointmentId);

        if ($medicalAppointment) {
            $medicalAppointment->setStatus('CANCELLED');
            $this->medicalAppointmentRepository->save($medicalAppointment);
        } else {
            throw new NotFoundHttpException('Medical appointment not found');
        }
    }

    public function modifyMedicalAppointment(int $id, MedicalAppointmentDto $medicalAppointmentDto): void
    {
        $medicalAppointment = $this->medicalAppointmentRepository->find($id);

        if (!$medicalAppointment) {
            throw new NotFoundHttpException('Medical appointment not found');
        }

        $medicalAppointment->initializeFromDto($medicalAppointmentDto, $medicalAppointment->getPatient());

        $this->medicalAppointmentRepository->save($medicalAppointment);
    }
}
