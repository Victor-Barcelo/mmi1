<?php

namespace AppBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class MainControllerTest extends WebTestCase
{
    public function testGetNewsFeed()
    {
        $client = static::createClient();
        $client->request('GET', '/mmi-mu-1/api/getNewsFeed/es/%7B%22El%20Pa%C3%ADs%22%3Afalse%2C%22El%20Economista%22%3Afalse%2C%22El%20Confidencial%22%3Atrue%7D');
        $response = $client->getResponse();
        $this->assertSame(200, $client->getResponse()->getStatusCode());
        $this->assertSame('application/json', $response->headers->get('Content-Type'));
        $this->assertNotEmpty(json_decode($response->getContent())->news);
    }
}