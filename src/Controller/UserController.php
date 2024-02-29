<?php

namespace App\Controller;

use App\Entity\User;
use App\Helper\SerializerHelper;
use App\Helper\UserHelper;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    private SerializerHelper $serializer;
    private UserService $userService;
    private UserHelper $userHelper;

    public function __construct(
        SerializerHelper $serializer,
        UserService $userService,
        UserHelper $userHelper
    )
    {
        $this->serializer = $serializer;
        $this->userService = $userService;
        $this->userHelper = $userHelper;
    }

    
    #[Route('/register', name: 'register_user', methods: ['POST'])]
    public function register(Request $request): Response
    {
        $user = $this->serializer->deserialize($request->getContent(), User::class);
        $this->userHelper->validateCreationFields($user);
        $this->userService->createUser($user);
        return $this->json(
            $user,
            Response::HTTP_CREATED,
            ['Location' => '/login']
        );
    }
}
