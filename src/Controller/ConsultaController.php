<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ConsultaController {
    #[Route('/consultas', name: 'consulta_list', methods: ['GET'])]
    public function listConsultas(): Response 
    {
        return new Response('[{"id":1,"detalhes":"qqr coisa","data":"2024-06-02T12:00:00Z"}]',200, ['Content-Type' => 'application/json']);
    }

    #[Route('/consultas/{id}', name: 'consulta_details', methods: ['GET'])]
    public function consultaDetails(int $id): Response
    {
        return new Response('[{"id":'. $id .',"detalhes":"qqr coisa","data":"2024-06-02T12:00:00Z"}]',200, ['Content-Type' => 'application/json']);
    }

    #[Route('/consultas', name: 'consulta_create', methods:['POST'])]
    public function create(): Response 
    {
        return new Response('', 201);
    }

    #[Route('/consultas/{id}', name: 'consulta_update', methods: ['PUT'])]
    public function updateConsultas(int $id, Request $request): Response
    {
        return new Response($request->getContent(), headers: ['Content-Type' => 'application/json']);
    }
}