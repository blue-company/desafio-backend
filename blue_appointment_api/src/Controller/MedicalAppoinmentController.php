<?php

namespace App\Controller;

use App\Service\MedicalAppointmentService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/medical-appointments", name="api_medical_appointments_")
 */
class MedicalAppointmentController extends AbstractController
{
    private MedicalAppointmentService $medicalAppointmentService;

    public function __construct(MedicalAppointmentService $medicalAppointmentService)
    {
        $this->medicalAppointmentService = $medicalAppointmentService;
    }

    /**
     * @Route("/create", name="create", methods={"POST"})
     */
    public function create(Request $request): JsonResponse
    {
        $requestData = json_decode($request->getContent(), true);

        $patientId = $requestData['patientId'];
        $notes = $requestData['notes'];
        $titleReason = $requestData['titleReason'];
        $descriptionReason = $requestData['descriptionReason'];
        $appointmentDate = new \DateTime($requestData['appointmentDate']);

        $this->medicalAppointmentService->createMedicalAppointment(
            $patientId,
            $notes,
            $appointmentDate,
            $descriptionReason,
            $titleReason
        );

        return $this->json(['message' => 'Medical appointment created successfully']);
    }
}
