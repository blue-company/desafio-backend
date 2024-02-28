<?php

namespace App\Service;

use App\Entity\MedicalAppointment;
use App\Infra\Dto\MedicalAppointmentDto;
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

    public function getMedicalAppointmentById(int $appointmentId): MedicalAppointment
    {
        $medicalAppointment = $this->medicalAppointmentRepository->find($appointmentId);

        if (!$medicalAppointment) {
            throw new NotFoundHttpException('Medical appointment not found');
        }

        return $medicalAppointment;
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

        if (!$medicalAppointment || $medicalAppointment->getStatus() == 'CANCELLED') {
            throw new NotFoundHttpException('Medical appointment not found or was cancelled');
        }

        $medicalAppointment->initializeFromDto($medicalAppointmentDto, $medicalAppointment->getPatient());

        $this->medicalAppointmentRepository->save($medicalAppointment);
    }

    public function checkLinkMedicalAppointment(int $id) {
        $appointment = $this->medicalAppointmentRepository->find($id);
        
        if($appointment->isTokenUsed()) {
            throw new \Exception('Link Expired!');
        }

        $appointment->setIsTokenUsed(true);
        $this->medicalAppointmentRepository->save($appointment);

        return $appointment;
    }

    public function registerToken(MedicalAppointment $appointment, string $token): void {
        $appointment->setAppointmentToken($token);
        $appointment->setIsTokenUsed(false);
        $this->medicalAppointmentRepository->save($appointment);
    }

}
