<?php

namespace App\Controller;

use App\Dto\MedicalAppointmentDto;
use App\Service\MedicalAppointmentService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
// use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Dompdf\Dompdf;
use Symfony\Component\HttpFoundation\JsonResponse;

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
    public function create(Request $request): BinaryFileResponse
    {
        $requestData = json_decode($request->getContent(), true);
        $medicalAppointmentDto = new MedicalAppointmentDto($requestData);
        $appointmentCreated = $this->medicalAppointmentService->createMedicalAppointment($medicalAppointmentDto);
        $patient = $appointmentCreated->getPatient();

        $data = [
            // 'imageSrc' => $this->imageToBase64($this->getParameter('kernel.project_dir') . '/public/img/profile.png'),
            'notes' => $appointmentCreated->getNotes(),
            'titleReason' => $appointmentCreated->getTitleReason(),
            'descriptionReason' => $appointmentCreated->getDescriptionReason(),
            'appointmentDate' => $appointmentCreated->getAppointmentDate(),
            'fullName' => $patient->getFullName(),
            'email' => $patient->getEmail(),
            'sex' => $patient->getSex(),
            'birthDate' => $patient->getBirthDate()
        ];
        $html = $this->renderView('medical_appointment/index.html.twig', $data);
        $dompdf = new Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->render();

        $pdfPath = tempnam(sys_get_temp_dir(), 'pdf');
        file_put_contents($pdfPath, $dompdf->output());

        $response = new BinaryFileResponse($pdfPath);
        $response->headers->set('Content-Type', 'application/pdf');

        $response->setContentDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            'resume.pdf'
        );

        return $response;
    }

    private function imageToBase64($path)
    {
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        return $base64;
    }
}
