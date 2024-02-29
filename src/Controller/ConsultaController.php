<?php

namespace App\Controller;

use App\Entity\Consulta;
use App\Exception\InvalidRequestException;
use App\Exception\ResourceNotFoundException;
use App\Helper\ConsultaHelper;
use App\Helper\SerializerHelper;
use App\Service\ConsultaService;
use App\Service\PDFService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ConsultaController extends AbstractController {
    private ConsultaService $consultaService;
    private PDFService $pdfService;
    private ConsultaHelper $consultaHelper;
    private SerializerHelper $serializer;

    public function __construct(
        ConsultaService $consultaService,
        PDFService $pdfService,
        ConsultaHelper $consultaHelper,
        SerializerHelper $serializer
    )
    {
        $this->consultaService = $consultaService; 
        $this->pdfService = $pdfService; 
        $this->consultaHelper = $consultaHelper; 
        $this->serializer = $serializer; 
    }

    #[Route('/consultas', name: 'consulta_list', methods: ['GET'])]
    public function listConsultas(): Response 
    {
        $consultas = $this->consultaService->findConsultas();
        return $this->json($consultas);
    }

    #[Route('/consultas/{path}', name: 'consulta_details', methods: ['GET'])]
    public function consultaDetails(string $path): void
    {   
        $consulta = $this->consultaService->findConsulta(rawurldecode($path));
        if(!$consulta) {
            throw new ResourceNotFoundException();
        }
        $html = $this->renderView(
            'consulta.html.twig',
            ['consulta' => $consulta]
        );
        $this->pdfService->renderPdf($html);
    }

    #[Route('/consultas', name: 'consulta_create', methods:['POST'])]
    public function create(Request $request): Response
    {
        $consulta = $this->serializer->deserialize($request->getContent(), Consulta::class);
        $this->consultaHelper->validateCreationFields($consulta);
        $this->consultaService->createConsulta($consulta);
        $location = $this->consultaHelper->encryptRoute($consulta);
        return new Response(
            null,
            Response::HTTP_CREATED,
            [
                'Location' => $location
            ]
        );
    }

    #[Route('/consultas/{id}', name: 'consulta_update', methods: ['PUT'])]
    public function updateConsultas(
                                    int $id,
                                    Request $request,
                                ): Response
    {
        $updatedConsulta = $this->serializer
            ->deserialize($request->getContent(), Consulta::class);
        if($updatedConsulta->getId() !== $id) {
            throw new InvalidRequestException("Id don't match");
        }
        $consulta = $this->consultaService->updateConsulta($updatedConsulta);

        return $this->json($consulta);
    }

    #[Route('/consultas/{id}', name: 'consulta_delete', methods: ['DELETE'])]
    public function deleteConsulta(Consulta $consulta): Response
    {
        $this->consultaService->deleteConsulta($consulta);
        return new Response('', Response::HTTP_NO_CONTENT);
    }
}