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
        $this->assertArrayHasKey('patientId', $responseData, 'Response should contain an "patientId" key');
        $this->assertGreaterThan(0, $responseData['patientId'], 'The "patientId" should be a positive integer');
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
        
        $responseArray = json_decode($client->getResponse()->getContent(), true);
        
        $this->assertSame(Response::HTTP_CONFLICT, $client->getResponse()->getStatusCode(), 'Expected a 409 Conflict status code');
        $this->assertArrayHasKey('error', $responseArray, 'Response should contain an "error" key');
        $this->assertArrayHasKey('message', $responseArray['error'], 'Error array should contain a "message" key');
        $this->assertEquals('Email is associated to other account!', $responseArray['error']['message'], 'Error message should match');
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
