<?php

namespace App\Controller;

use App\Infra\Dto\MedicalAppointmentDto;
use App\Infra\Security\HashHandler;
use App\Service\MedicalAppointmentService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Dompdf\Dompdf;

/**
 * @Route("/api/medical-appointments", name="api_medical_appointments_")
 */
class MedicalAppointmentController extends AbstractController
{
    private MedicalAppointmentService $medicalAppointmentService;
    private HashHandler $hashHandler;

    public function __construct(
        MedicalAppointmentService $medicalAppointmentService, 
        HashHandler $hashHandler,
    )
    {
        $this->medicalAppointmentService = $medicalAppointmentService;
        $this->hashHandler = $hashHandler;
    }

    /**
     * @Route("/create", name="create", methods={"POST"})
     */
    public function create(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        $medicalAppointmentDto = new MedicalAppointmentDto($requestData);
        $appointmentCreated = $this->medicalAppointmentService->createMedicalAppointment($medicalAppointmentDto);
        
        $token = $this->hashHandler->encodeId($appointmentCreated->getId());
        $url = $this->hashHandler->generateUniqueLink($token);
        $this->medicalAppointmentService->registerToken($appointmentCreated, $token);
        
        return new JsonResponse(
            ['appointment_details_link' => $url], 
            Response::HTTP_CREATED
        );
    }
    

    /**
     * @Route("/view/{token}", name="view", methods={"GET"})
     */
    public function view(string $token): BinaryFileResponse
    {
        $id = $this->hashHandler->decodeId($token);
        $appointment = $this->medicalAppointmentService->checkLinkMedicalAppointment($id);

        $patient = $appointment->getPatient();

        $data = [
            'notes' => $appointment->getNotes(),
            'titleReason' => $appointment->getTitleReason(),
            'descriptionReason' => $appointment->getDescriptionReason(),
            'appointmentDate' => $appointment->getAppointmentDate(),
            'fullName' => $patient->getFullName(),
            'email' => $patient->getEmail(),
            'sex' => $patient->getSex(),
            'birthDate' => $patient->getBirthDate()
        ];

        $html = $this->renderView('medical_appointment/index.html.twig', $data);

        $dompdf = new Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->render();

        $pdfContent = $dompdf->output();

        $pdfPath = tempnam(sys_get_temp_dir(), 'pdf');
        file_put_contents($pdfPath, $pdfContent);

        $response = new BinaryFileResponse($pdfPath);
        $response->headers->set('Content-Type', 'application/pdf');

        return $response;
    }

    /**
     * @Route("/cancel/{id}", name="cancel", methods={"DELETE"})
     */
    public function cancel(int $id): JsonResponse
    {
        $this->medicalAppointmentService->cancelMedicalAppointment($id);
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * @Route("/modify/{id}", name="modify", methods={"PUT"})
     */
    public function modify(int $id, Request $request): JsonResponse
    {
        $requestData = json_decode($request->getContent(), true);
        $medicalAppointmentDto = new MedicalAppointmentDto($requestData);
        $this->medicalAppointmentService->modifyMedicalAppointment($id, $medicalAppointmentDto);
        
        return new JsonResponse(
            ['message' => 'Medical appointment modified successfully'], 
            Response::HTTP_OK
        );
    }

    private function imageToBase64($path)
    {
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        return $base64;
    }
}
