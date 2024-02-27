<?php

namespace App\Tests\Integration;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class UserControllerTest extends WebTestCase
{
    public function testRegisterUserSuccessfuly(): void
    {
        $client = static::createClient();
        $data = $this->getRealData();

        $client->request(
            'POST', 
            '/api/user/register',
            [],
            [],
            ['CONTENT-TYPE'=> 'application/json'],
            json_encode($data)
        );

        
        $content = $client->getResponse()->getContent();
        $responseData = json_decode($content, true);
        
        $this->assertResponseIsSuccessful();
        $this->assertArrayHasKey('id', $responseData, 'Response should contain an "id" key');
        $this->assertGreaterThan(0, $responseData['id'], 'The "id" should be a positive integer');
    }

    public function testRegisterUserWithDuplicateEmailShouldFail(): void 
    {
        $client = static::createClient();
        $data = [
            'email' => 'gar@gmail.com',
            'sex' => 'male',
            'fullName' => 'John Doe',
            'birthDate' => '1990-01-01',
            'username' => 'gar@gmail.com',
            'roles' => ['ROLE_USER'],
            'password' => 'test_password',
        ];

        $client->request(
            'POST', 
            '/api/user/register',
            [],
            [],
            ['CONTENT-TYPE'=> 'application/json'],
            json_encode($data)
        );

        
        $content = $client->getResponse()->getContent();
        $responseData = json_decode($content, true);
        
        $this->assertResponseStatusCodeSame(Response::HTTP_CONFLICT);
        $this->assertArrayHasKey('Error', $responseData, 'Response should contain an "Error" key');
        $this->assertEquals('Email is associated to other account!', $responseData['Error']);
    }

    public function getRealData(): array
    {
        return [
            'sex' => 'male',
            'fullName' => 'John Doe',
            'birthDate' => '1990-01-01',
            'username' => 'test@example.com',
            'roles' => ['ROLE_USER'],
            'email' => 'test@example.com',
            'password' => 'test_password',
        ];
    }
}
